#Hoist Connect SSJS Library

This JS Library is exposed to every Hoist Module running on the Hoist Connect system.

It's Exposed via a global variable called Hoist so you don't need to require anything.

#API Documentation

##[Log API](#logapi)
####[`Hoist.log([args], [callback])`](#hoistlogargscallback)

##[Data API](#dataapi)

####[`Hoist.data(type)`](#hoistdatatype)
* [`.setType(type)`](#settypetype)
* [`.save(object, [callback])`](#saveobjectcallback)
* [`.find(query, [callback])`](#findquerycallback)
* [`.findOne(query, [callback])`](#findonequerycallback)
* [`.findById(query, [callback])`](#findbyidquerycallback)

##[Events API](#eventapi)

#### [`Hoist.events`](#hoistevents)
* [`.raise(event, payload, [callback])`](#raiseeventpayloadcallback)

##[User API](#userapi)

####[`Hoist.user`](#hoistuser)
* [`.login(username, password, [callback])`](#loginusernamepasswordcallback)
* [`.invite(userDetails, callback)`](#inviteuserdetailscallback)

##[Connector API](#connectorapi)

#### [`Hoist.connector(type, key)`](#connector)
* [`{ConnectorManager}`](#connectormanager)
* [`.get`](#getarguments)

####[Unimplemented APIs](#unimplementedapis)
####[`Hoist.connector`](#connector)
* [`.post`](#postarguments)
* [`.put`](#putarguments)
* [`.delete`](#deletearguments)

####[`Hoist.buckets`](#buckets)
* [`.switch`](#switchbucketcallback)
* [`.current`](#currentcallback)

####[`Hoist.user`](#user)
* [`.current`](#current)

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

##`Hoist.events`

*Returns*
-`{HoistEventManager}`

## `{HoistEventManager}`

##`.raise(event, payload, [callback])`

Raise an event

*example* (raises the new:invoice event)

```javascript
Hoist.events.raise('new:invoice',{contact:'supplier', total:10.2}, function(){
  //new:invoice event raised
})
```
*Parameters*
- `event` the name of the event to raise
- `payload` an optional JSON serialisable object to deliver as the `payload` parameter in the event
- `[callback]` an optional callback to call after the event is raised with the first argument being `error` if an error occurred

*Returns*
- `{Promise}` a promise to have raised the event


## User API

##`Hoist.user`

##`.login(username, password, callback)`

switch the current session to be under the given user

*example* (switches the current session to bob)

```javascript
Hoist.users.login('bob@hoi.io', 'password123', function(err){
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

##`.invite(username, password, callback)`

switch the current session to be under the given user

*example* (switches the current session to bob)

```javascript
Hoist.users.login('bob@hoi.io', 'password123', function(err){
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
