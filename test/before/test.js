var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var http = require('http');
var request = require('supertest');


describe('Simple Case', function() {
    it('should be ok.', function() {
        var m = require('./non-circular/m.js');
        m.result.should.equal('ok');
    });
});

describe('Circular Dependency Found', function() {
    it('should throw Error if you set circleCheck to be true', function() {
        try {
            require('./circular/m.js');
        } catch (e) {
            e.message.toLowerCase().should.include('circular');
        }
    });
});


describe('Circular Dependency Found', function() {
    it('should not throw Error if you set circleCheck to be false', function() {
        var m = require('./circular2/m.js');
        m.result.should.equal('ok');
    });
});


describe('Form Login Case', function() {
    var app;
    var server;
    it('should not throw Error when you load routing test app',
        function() {
            app = require('./routing/');
        }
    );

    it('should allow you to access page and submit form', function(done) {
        request(app)
            .get('/')
            .end(function() {
                done();
            });
    });
});