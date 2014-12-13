#Hoist Connect SSJS Library

This JS Library is exposed to every Hoist Module running on the Hoist Connect system.

It's Exposed via a global variable called Hoist so you don't need to require anything.

#API Documentation

+ [Log API](#log-api)
  + [`Hoist.log([args], [callback])`](#hoistlogargs-callback)
+ [Lock API](#lock-api)
  + [`Hoist.lock(key, [timeout], [callback])`](#hoistlockkey-timeout-callback)
+ [Timeout API](#timeout-api)
  + [`Hoist.timeout.reset(milliseconds)`](#hoisttimeoutresetmilliseconds)
+ [Data API](#data-api)
  + [`Hoist.data(type)`](#hoistdatatype)
    + [`.setType(type)`](#settypetype)
    + [`.save(object, [callback])`](#savejsoncallback)
    + [`.find(query, [callback])`](#findquery-callback)
    + [`.findOne(query, [callback])`](#findonequery-callback)
    + [`.findById(query, [callback])`](#findbyididvalue-callback)
+ [Events API](#events-api)
  + [`Hoist.event`](#hoistevent)
    + [`.raise(event, [payload], [contextOverride], [callback])`](#raiseevent-payload-contextoverride-callback)
+ [User API](#user-api)
  + [`Hoist.user`](#hoistuser)
    + [`.login(username, password, [callback])`](#loginusername-password-callback)
    + [`.invite(userDetails, callback)`](#inviteuserdetails-password-callback)
+ [Connector API](#connector-api)
  + [`Hoist.connector(key)`](#hoistconnectorkey)
    + [`.get([arguments])`](#getarguments)
    + [`.post([arguments])`](#postarguments)
    + [`.put([arguments])`](#putarguments)
+ [Bucket API](#bucket-api)
  + [`Hoist.bucket`](#hoistbucket)
    + [`.add([key], [meta], [callback])`](#addkey-meta-callback)
    + [`.set(key, [create], [callback])`](#setkey-create-callback)
    + [`.get([key], [callback]`](#getkey-callback)
    + [`.getAll([callback])`](#getallcallback)
    + [`.each(fn, [callback]`](#eachfn-callback)
+ [Unimplemented APIs](#unimplementedapis)
  + [`Hoist.connector`](#connector)
    + [`.delete`](#deletearguments)
  + [`Hoist.user`](#user)
    + [`.current`](#current)
    + [`.invite`](#invite)

## Log API

##`Hoist.log([args], [callback])`
Log a message to the applications instance of Loggly

- this requires Loggly to be setup, see instructions in the portal

*example* (logs `Hello World` to the applications loggly account)
```javascript
Hoist.log('Hello World', function(){
  //message is sent
  done();
});
```
*Parameters*
- `[args] {Array}` messages to output to the Dev Console and the accounts loggly account
- `[callback]` an optional callback to call when the log has been sent

*Returns*
- A `{Promise}` to have sent the message, it's currently important that you wait till the message is sent before returning from your Hoist module. We expect to fix this ASAP

## Lock API

##`Hoist.lock(key, [timeout], [callback])`
Aquire a lock to ensure that you have exclusive access to a function. Will only run the callback function (or proceed the promise) once the lock has been aquired.

*example* (grabs the lock `example-lock` and proceeds once done)
```javascript
Hoist.lock('example-lock', function(lock){
  //have the lock
  //do work
  //release the lock
  lock.release();
});
```

*Paremeters*
- `key {String}` a key for the lock to have exclusive access to
- `[timeout] {number}` a timeout in milliseconds, defaults to 500
- `[callback] {function}` a callback to fire once lock has been aquired or timeout is reached. This callback should take one parameter `Lock` which has a release function you should call once the lock is to be released

*Returns*
- A `{Promise}` to return the `Lock` object to use promises instead of the callback syntax

## Timeout API

##`Hoist.timeout.reset(milliseconds)`
resets the timeout on the current module to be in `milliseconds` time. (Module timeout is 5 seconds by default)

*example* (extends the timeout for another 3 seconds)
```javascript
Hoist.timeout.reset(3000);
```

*Parameters*
- `milliseconds` the number of milliseconds to set the timeout to from now. Must be between 1 and 30000 (1-30 seconds)

*Returns*
- A `{Promise}` to have set the timeout, you don't need to chain this as it can run async and in the background.




## Data API

##`Hoist.data(type)`
Create a data manager object for _type_

*example* (returns a `DataTypeManager` for `Fruit` objects)

```javascript
var Fruits = Hoist.data('Fruit');
```


*Parameters*
- `Data Type {String}` This is the name of the type you want to carry out operations on. Objects of the same type will be grouped together and you can only Query over one type at a time. This is case insensitive.

*Returns*
- `{DataTypeManager}` an API object over the specified Data Type

##`{DataTypeManager}`
###`.setType(type)`
set or change the type for this manager

*example* (sets `Fruits` data type to `Banana`)

```javascript
Fruits.setType('Banana');
```


*Parameters*
- `Data Type {String}` This is the name of the type you want to carry out operations on. Objects of the same type will be grouped together and you can only Query over one type at a time. This is case insensitive.

###`.save(json,[callback])`
saves a new object, or updates an existing object in the type collection

*example* (saves the object with the `_id` `Banana` and if an existing object with the same id exists the object __will be overwritten__.)

```javascript
Fruits.save({_id:'Banana',name:'Banana',color:'Yellow'},function(err, savedObject){
  if(err){
    console.log('there was an error during save:', err.message);
    return
  }
  //{_id: Banana, name: 'Banana', color:'Yellow', _createdDate:'xyz', _updatedDate: 'xyz'}
  console.log('the object was saved', savedObject);
});
```


*Parameters*
- `json {object}` this is the object to be saved. If _id is provided and an existing object with the same _id exists it will be updated
- `[callback]` optional callback function that will be called once the object is saved. with error as the first parameter if an error occurred, and the saved object as the second parameter.

*Returns*
- `{Promise}` a promise to return the saved object. use this instead of the callback if you want to use promise chains (.then .catch etc)

###`.find(query, callback)`
returns a collection of objects from the type collection that match the given query

*example* (finds all fruit with the color Red)

```javascript
Fruits.find({color:'Red'},function(err, redFruit){
  if(err){
    console.log('there was an error during find:', err.message);
    return
  }
  // [{_id:'Strawberry', color:'Red'},{_id:'Rasberry', color:'Red' }]
  console.log('the query found the following fruit', redFruit);
});
```

*Parameters*
- `json {object}` this is the object to be saved. If _id is provided and an existing object with the same _id exists it will be updated
- `[callback]` optional callback function that will be called once the object is saved. with `error` as the first parameter if an error occurred, and an `array` of matching objects as the second parameter (or an empty array if none found).

*Returns*
- `{Promise}` a promise to return an array of matching objects. use this instead of the callback if you want to use promise chains (`.then` `.catch` etc)

###`.findOne(query, callback)`
returns the first object in the type collection to match the supplied query

*example* (finds one fruit with the color Red)

```javascript
Fruits.findOne({color:'Red'},function(err, redFruit){
  if(err){
    console.log('there was an error during find:', err.message);
    return
  }
  // {_id:'Strawberry', color:'Red'}
  console.log('the query found the following fruit', redFruit);
  });
```

*Parameters*
- `query` a mongo style query used to select the object
- `[callback]` optional callback function that will be called once the object is saved. with `error` as the first parameter if an error occurred, and the first matching object as the second parameter or `null` if no match found.

*Returns*
- `{Promise}` a promise to return the matched object.

###`.findById(idValue, callback)`
finds a single object matching the given id or `null`

*example* (finds the fruit with the id Cucumber)

```javascript
Fruits.find('Cucumber',function(err, cucumber){
  if(err){
    console.log('there was an error during find:', err.message);
    return
  }
  // {_id:'Cucumber', color:'Cucumber'}
  console.log('the query found the following fruit', cucumber);
});
```

*Parameters*
- `idValue` the id to match agains the object found
- `[callback]` optional callback function that will be called once the object is saved. with `error` as the first parameter if an error occurred, and the matched object or `null` as the second parameter.

*Returns*
- `{Promise}` a promise to return the saved object. use this instead of the callback if you want to use promise chains (.then .catch etc)

## Events API

##`Hoist.event`

*Returns*
-`{HoistEventManager}`

## `{HoistEventManager}`

##`.raise(event, [payload], [contextOverride], [callback])`

Raise an event

*example* (raises the new:invoice event)

```javascript
Hoist.event.raise('new:invoice',{contact:'supplier', total:10.2}, function(){
  //new:invoice event raised
})
```
*Parameters*
- `event` the name of the event to raise
- `[payload]` an optional JSON serialisable object to deliver as the `payload` parameter in the event
- `[contextOveride]` an object allowing you to override the events bucket with the bucket that you specify ({bucket:bucketObject})
- `[callback]` an optional callback to call after the event is raised with the first argument being `error` if an error occurred

*Returns*
- `{Promise}` a promise to have raised the event


## User API

##`Hoist.user`

##`.login(username, password, callback)`

switch the current session to be under the given user

*example* (switches the current session to bob)

```javascript
Hoist.user.login('bob@hoi.io', 'password123', function(err){
  if(err){
    // bob has failed to log in
  }
  else{
    // session is now running as bob
  }
});
```

*Parameters*
  - `username` any email address registered against the user
  - `password` the user's password
  - `[callback]` an optional callback that will be called, the first argument will be an error if one has occurred

*Returns*
- `{Promise}` a promise to have logged the user in


## Connector API

##`Hoist.connector(key)`

Create a connector manager object for the type of connector and the settings represented by key.

*example* (returns a `{Connector}` object with the key `internal-xero`)

```javascript
var xeroInternal = Hoist.connector('internal-xero');
```

*Parameters*
- `Key {String}` The key for the connector settings to use

*Returns*
- `{Connector}` a connector to work with the specified API

##`.get([arguments])`

perform a get request agains the connector


*example* (perform a get request against the given endpoint)

```javascript
xeroInternal.get('/invoices')
.then(function(responseJson){
  //response received
})
```

*Parameters*
- `[arguments] {array}` zero or more arguments to pass to the connector. _see individual connector documentation_

*Returns*
- `{Promise}` a promise to have received the response from the endpoint. See individual connector documentation for how each connector endpoint works.

##`.post([arguments])`

perform a post request agains the connector


*example* (perform a post request against the given endpoint)

```javascript
xeroInternal.post('/invoices', data)
.then(function(responseJson){
  //response received
})
```

*Parameters*
- `[arguments] {array}` zero or more arguments to pass to the connector. _see individual connector documentation_

*Returns*
- `{Promise}` a promise to have received the response from the endpoint. See individual connector documentation for how each connector endpoint works.

##`.put([arguments])`

perform a put request agains the connector


*example* (perform a put request against the given endpoint)

```javascript
xeroInternal.put('/invoices', data)
.then(function(responseJson){
  //response received
})
```

*Parameters*
- `[arguments] {array}` zero or more arguments to pass to the connector. _see individual connector documentation_

*Returns*
- `{Promise}` a promise to have received the response from the endpoint. See individual connector documentation for how each connector endpoint works.



## Bucket API

##`Hoist.bucket`

##`.add([key], [meta], [callback])`

create a new bucket (doesn't set it to the current bucket)

*example* (creates a new bucket with key 'group one' and meta data {info: 'some info'})

```javascript
Hoist.bucket.add('group one', {info: 'some info'})
.then(function (bucket) {
  if (bucket) {
    // a bucket has been created with the specified key and meta data
  }
}).catch(function(err) {
    // error if the specified key already exists
});
```


*Parameters*
- `[key]` an optional string, the key of the bucket to create, if no key is supplied a random key will be generated
- `[meta]` an optional object, the meta data associated to the bucket
- `[callback]` an optional callback that will be called, the first argument will be an error if one has occurred

*Returns*
- `{Promise}` a promise to have created the bucket


##`.set(key, [create], [callback])`

set the current bucket to be the given bucket, or create a new bucket if it doesn't exist and set it to the current bucket

*example* (switches the current bucket to the bucket with key 'group one')

```javascript
Hoist.bucket.set('group one')
.then(function (bucket) {
  if (bucket) {
    // the current bucket has been set to the specified one
  }
}).catch(function(err) {
    // error does not exist
});
```

*example* (switches the current bucket to the bucket with key 'group one')

```javascript
Hoist.bucket.set('group two', true)
.then(function (bucket) {
  if (bucket) {
    // the specified bucket has been created and set to the current bucket
  }
}).catch(function(err) {
    // error the specified bucket could not be saved
});
```

*Parameters*
- `key` the key of the bucket to set
- `[create]` an optional boolean, when set to true if the specified bucket does not exist one will be created with the given key and set to the current context
- `[callback]` an optional callback that will be called, the first argument will be an error if one has occurred

*Returns*
- `{Promise}` a promise to have set the bucket


##`.get([key], [callback])`

retrieve a specific bucket or the current bucket

*example* (retrieves the current bucket in the current application and environment)

```javascript
Hoist.bucket.get()
.then(function (bucket) {
  if (bucket) {
    // bucket returned is the current bucket
  }
}).catch(function(err) {
    // error the current bucket is not set
});
```

*example* (retrieves the specified bucket in the current application and environment)

```javascript
Hoist.bucket.get('group one')
.then(function (bucket) {
  if (bucket) {
    // bucket returned is the specified bucket
  }
}).catch(function(err) {
    // error the specified bucket does no exist
});
```

*Parameters*
- `[key]` an optional parameter, the key of the bucket to retrieve, if no bucket key specified the bucket in the current context will be retrieved if there is one
- `[callback]` an optional callback that will be called, the first argument will be an error if one has occurred

*Returns*
- `{Promise}` a promise to have retrieved the bucket


##`.getAll([callback])`

retrieve all the buckets in the current context

*example* (retrieves the all the buckets current application and environment)


```javascript
Hoist.bucket.getAll()
.then(function (buckets) {
  if (buckets.length) {
    // all the buckets in the current context
  } else {
    // there are no buckets currently set in the current context
  }
});
```

*Parameters*
- `[callback]` an optional callback that will be called, the first argument will be an error if one has occurred

*Returns*
- `{Promise}` a promise to have retrieved all the buckets


##`.each(fn, [callback])`

iterates through each bucket in the current context and calls the specified function

*example* (log out each bucket in the current context)

```javascript
Hoist.bucket.each(function (bucket) {
  if (bucket) {
    console.log(bucket);
  }
})
```

*Parameters*
- `fn` function to map to each bucket in the current context
- `[callback]` an optional callback that will be called, the first argument will be an error if one has occurred

*Returns*
- `{Promise}` a promise to have returned all the buckets
