var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    conf = require('./conf.js'),
    should = chai.should(),
    m = Zeta.module('l0c', ['l1c']);

conf.ns = {};
conf.ns.ns = {};
m.config('root', __dirname);
m.config('circleCheck', true);

/*=======================================================*/
m.config('v', 1);
m.config.of('ns').val('v1', 1).val('v2', 2);
m.config.of('ns').of('ns').val('v1', 1).val('v2', 2);
/*=======================================================*/
m.l0c = true;


describe('circular dependency check1', function() {
    it('should throw error if circleCheck is true', function() {
        try {
            m.load();
            throw new Error();
        } catch (e) {
            e.message.toLowerCase().should.include('circular');
        }
    });
});

conf.ns = {};
conf.ns.ns = {};
m.config('circleCheck', false);
describe('circular dependency check2', function() {
    it('should be ok if circleCheck is false', function() {
        m.load();
    });

    describe('module inheritation check', function() {
        it('should inherit the attributes from all of its dependents', function() {
            assert.isTrue(m.l0c && m.l1c && m.l2e && m.l2f && m.l2g);
        });

        it('should inherit the attributes that set in init function in all of its dependent', function() {
            assert.isTrue(m.il1c && m.il2e && m.il2f && m.il2g);
        });

        it('should inherit the providers from all of its dependents', function() {
            assert.isDefined(m.save.provider['l1c.p']);
            assert.isDefined(m.save.provider['l2e.p']);
            assert.isDefined(m.save.provider['l2f.p']);
            assert.isDefined(m.save.provider['l2g.p']);
        });
        it('should inherit the factories from all of its dependents', function() {
            assert.isDefined(m.save.factory['l1c.f']);
            assert.isDefined(m.save.factory['l2e.f']);
            assert.isDefined(m.save.factory['l2f.f']);
            assert.isDefined(m.save.factory['l2g.f']);
        });
        it('should inherit the handlers from all of its dependents', function() {
            assert.isDefined(m.save.handler['l1c.h']);
            assert.isDefined(m.save.handler['l2e.h']);
            assert.isDefined(m.save.handler['l2f.h']);
            assert.isDefined(m.save.handler['l2g.h']);
        });
        it('should inherit the routing configuration from all of its dependents', function() {
            assert.isDefined(m.save.router.get['/l1c']);
            assert.isDefined(m.save.router.get['/l2e']);
            assert.isDefined(m.save.router.get['/l2f']);
            assert.isDefined(m.save.router.get['/l2g']);
        });
    });



    describe('module config check', function() {
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
});