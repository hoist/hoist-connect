#Hoist Connect SSJS Library

This JS Library is exposed to every Hoist Module running on the Hoist Connect system.

It's Exposed via a global variable called Hoist so you don't need to require anything.

#API

* [.data](#Data)
  * [`{DataTypeManager}`](#datatypemanager)
  * [`.setType`](#settypetype)
  * [`.save`](#savejsoncallback)

## Data

##`Hoist.data(type)`
Create a data manager object for _type_

*example*

```javascript
var Fruits = Hoist.data('Fruit');
```
_return a DataTypeManager for Fruit objects_

*Parameters*
- `Data Type {String}` This is the name of the type you want to carry out operations on. Objects of the same type will be grouped together and you can only Query over one type at a time. This is case insensitive.

*Returns*
- `{DataTypeManager}` an API object over the specified Data Type

##`{DataTypeManager}`
###`.setType(type)`
set or change the type for this manager

*example*

```javascript
Fruits.setType('Banana');
```
sets Fruits' data type to 'Banana'

*Parameters*
- `Data Type {String}` This is the name of the type you want to carry out operations on. Objects of the same type will be grouped together and you can only Query over one type at a time. This is case insensitive.

###`.save(json,[callback])`
saves a new object, or updates an existing object in the type collection

*example*

```javascript
Fruits.save({_id:'Banana',name:'Banana',color:'Yellow'},function(err,savedObject){
  if(err){
    console.log('there was an error during save:',err.message);
    return
  }
  console.log('the object was saved',savedObject);
});
```
saves the object with the _id: 'Banana' and if an existing object with the same id exists the object will be overwritten.

*Parameters*
- `json {object}` this is the object to be saved. If _id is provided and an existing object with the same _id exists it will be updated
- `[callback]` optional callback function that will be called once the object is saved. with error as the first parameter if an error occurred, and the saved object as the second parameter.

*Returns*
- `{Promise}` a promise to return the saved object. use this instead of the callback if you want to use promise chains (.then .catch etc)
