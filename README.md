#Hoist Connect SSJS Library

This JS Library is exposed to every Hoist Module running on the Hoist Connect system.

It's Exposed via a global variable called Hoist so you don't need to require anything.

#API

* [`Hoist.log`](#log)
* [`Hoist.data`](#data)
  * [`{DataTypeManager}`](#datatypemanager)
  * [`.setType`](#settypetype)
  * [`.save`](#savejsoncallback)
  * [`.find`](#findquerycallback)
  * [`.findOne`](#findonequerycallback)
  * [`.findById`](#findbyidquerycallback)
* [`Hoist.events`](#events)
  * [`{HoistEventManager}`](#hoisteventmanger)
  * [`.raise(event,payload)`](#raiseeventpayload)

## Log

##`Hoist.log(message)`
Log a message to the applications instance of Loggly

- this requires Loggly to be setup, see instructions in the portal

*example* (logs `Hello World` to the applications loggly account)
```javascript
Hoist.log('Hello World').then(function(){
  //message is sent
  done();
});
```
*Parameters*
- `message {string}` the message to send to loggly

*Returns*
- A `{Promise}` to have sent the message, it's currently important that you wait till the message is sent before returning from your Hoist module. We expect to fix this ASAP



## Data

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

## Events

##`Hoist.events`

*Returns*
-`{HoistEventManager}`

## `{HoistEventManager}`

##`.raise(event, payload)`

*example* (raises the new:invoice event)

```javascript
Hoist.events.raise('new:invoice',{contact:'supplier', total:10.2})
.then(function(){
  //new:invoice event raised
})
```
*Parameters*
- `event` the name of the event to raise
- `payload` an optional JSON serialisable object to deliver as the `payload` parameter in the event

*Returns*
- `{Promise}` a promise to have raised the event
