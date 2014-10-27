'use strict';
var chai = require('chai');
chai.should();
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
var expect = chai.expect;
process.env.NODE_ENV = 'test';
var BBPromise = require('bluebird');
var unhandledPromises = [];
BBPromise.onPossiblyUnhandledRejection(function(reason, promise) {
    unhandledPromises.push(promise);
    //Update some debugger UI
});

BBPromise.onUnhandledRejectionHandled(function(promise) {
    var index = unhandledPromises.indexOf(promise);
    unhandledPromises.splice(index, 1);
    //Update the debugger UI
});

after(function () {
  if(unhandledPromises.length>0){
    console.error('unhandled promise exceptions',unhandledPromises);

  }
  expect(unhandledPromises.length).to.eql(0);
});
