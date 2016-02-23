var chai = require('chai');
var expect = require('chai').expect;
var word = require('');

describe('Sanitize', function(){
    beforeEach(function(){
        console.log('before each it*************************************');
    });
    afterEach(function(){
        console.log('After each it**************************************\n');
    });
   
    it('Returns the lowercase of a string', function() {   //it.only will only do this function
        
        var inputWord = 'HELLO WORLD';
        var outputWord = word.sanitize(inputWord);
        
        expect(outputWord).to.equal('hello world');
        // expect(outputWord).to.not.equal('HELLO WORLD');
        // expect(outputWord).to.be.a('string');
        // expect(outputWord).to.not.be.a('number');
        // expect(outputWord).to.contain('hello');
    });
    
    it('remove a hyphen', function() {      // it.skip will skip this in the test
        var inputWord= 'HELLO-WORLD';
        var outputWord = word.sanitize(inputWord);
        
        expect(outputWord).to.equal('hello world');
    });
    
})