var chai = require('chai');
var jsdom = require('mocha-jsdom')
var expect = require('chai').expect;
var app = require('../app.js');
var angular = require('angular');

describe('This test is checking if the variable exists', function(){
    
   
    
    expect(app.getApplication).to.be.equal(true);
    
})