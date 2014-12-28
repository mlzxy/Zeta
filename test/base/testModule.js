var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    conf = require('./conf.js'),
    request = require('supertest'),
    should = chai.should(),
    m = Zeta.module('l0', ['l1a', 'l1b']);



m.config('root', __dirname);
/*=======================================================*/
m.config('v', 1);
m.config.of('ns').val('v1', 1).val('v2', 2);
m.config.of('ns').of('ns').val('v1', 1).val('v2', 2);
/*=======================================================*/

conf.ns = {};
conf.ns.ns = {};
m.load();


m.l0 = true;


describe('module inheritation check', function() {
    describe('the child module', function() {
        it('should inherit the attributes from all of its dependents', function() {
            assert.isTrue(m.l0 && m.l1a && m.l1b && m.l2a && m.l2b && m.l2c && m.l2d);
        });

        it('should inherit attributes that set in the dependents\' init function', function() {
            assert.isTrue(m.il1a && m.il1b && m.il2a && m.il2b && m.il2c && m.il2d);
        });

        it('should inherit the providers from all of its dependents', function() {
            assert.isDefined(m.save.provider['l1a.p']);
            assert.isDefined(m.save.provider['l1b.p']);
            assert.isDefined(m.save.provider['l2a.p']);
            assert.isDefined(m.save.provider['l2b.p']);
            assert.isDefined(m.save.provider['l2c.p']);
            assert.isDefined(m.save.provider['l2d.p']);
        });
        it('should inherit the factories from all of its dependents', function() {
            assert.isDefined(m.save.factory['l1a.f']);
            assert.isDefined(m.save.factory['l1b.f']);
            assert.isDefined(m.save.factory['l2a.f']);
            assert.isDefined(m.save.factory['l2b.f']);
            assert.isDefined(m.save.factory['l2c.f']);
            assert.isDefined(m.save.factory['l2d.f']);
        });
        it('should inherit the handlers from all of its dependents', function() {
            assert.isDefined(m.save.handler['l1a.h']);
            assert.isDefined(m.save.handler['l1b.h']);
            assert.isDefined(m.save.handler['l2a.h']);
            assert.isDefined(m.save.handler['l2b.h']);
            assert.isDefined(m.save.handler['l2c.h']);
            assert.isDefined(m.save.handler['l2d.h']);
        });
        it('should inherit the routing configuration from all of its dependents', function() {
            assert.isDefined(m.save.router.get['/l1a']);
            assert.isDefined(m.save.router.get['/l1b']);
            assert.isDefined(m.save.router.get['/l2a']);
            assert.isDefined(m.save.router.get['/l2b']);
            assert.isDefined(m.save.router.get['/l2c']);
            assert.isDefined(m.save.router.get['/l2d']);
        });
    });
});


describe('module config test', function() {
    describe('the configuration v', function() {
        it(' should be passed to every module', function() {
            conf.v.should.equal(1);

        });
    });
    describe('the variable in configuration namespace', function() {
        describe('v1', function() {
            it('should be passed to every module', function() {
                conf.ns.v1.should.equal(1);
            });
        });
        describe('v2', function() {
            it('should be passed to every module', function() {
                conf.ns.v2.should.equal(2);
            });
        });
    });
    describe('the variable in nested configuration namespace', function() {
        describe('v1', function() {
            it('should be passed to every module', function() {
                conf.ns.ns.v1.should.equal(1);
            });
        });
        describe('v2', function() {
            it('should be passed to every module', function() {
                conf.ns.ns.v2.should.equal(2);
            });
        });
    });

});