var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('Circular Dependency Found', function() {
    it('should throw Error if you set circleCheck to be true', function() {
        try {
            require('./circular/m.js');
        } catch (e) {
            e.message.toLowerCase().should.include('circular');
        }
    });
});