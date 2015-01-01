var Zeta = require('../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    m = Zeta.module('test.config', []);
m.config('loadinfo', true).load();




describe('module', function() {
    describe('.config(loadinfo,true)', function() {
        it('should save the loadinfo into the module', function() {
            assert.isDefined(m.loadinfo);
        });
    });

    describe('.config()', function() {
        it('should return the options object', function() {
            m.config().should.be.equal(m.config.options);
        });
    });
    describe('.config(k,v)', function() {
        it('should set options', function() {
            m.config('val', 1);
            m.config.options.val.should.be.equal(1);
        });
        it('should return the module, so call could be chained', function() {
            m.config('val', 1).should.be.equal(m);
        });
    });


    describe('.config(k)', function() {
        it('should return the options[k]', function() {
            m.config('val').should.be.equal(1);
        });
    });

    describe('.config', function() {
        describe('.of(ns).val()', function() {
            it('should return undefined when you access an unexisted namespace', function() {
                assert.isUndefined(m.config.of('ns').val());
                assert.isUndefined(m.config.of('ns').val('key'));
            });
            it('should return the namespace if it exists', function() {
                m.config.of('ns').val('key', 1);
                m.config.of('ns').val().should.be.equal(m.config.options.ns);
            });
        });

        describe('.of(ns).val(k,v)', function() {
            it('should set options in namespace ns', function() {
                m.config.of('ns').val('key', 1);
                m.config.options.ns.key.should.be.equal(1);
            });
            it('should return config.of so call could be chain', function() {
                m.config.of('ns').val('key', 1).should.be.equal(m.config.of);
            });
        });

        describe('.of(ns).val(k)', function() {
            it('should return options.ns[k]', function() {
                m.config.of('ns').val('key').should.be.equal(1);
            });
        });
    });

    describe('.config.of(ns) nested namespace', function() {
        describe('.of(ns).val()', function() {
            it('should return undefined when you access an unexisted namespace', function() {
                assert.isUndefined(m.config.of('ns').of('ns').val());
                assert.isUndefined(m.config.of('ns').of('ns').val('key'));
            });
            it('should return the namespace if it exists', function() {
                m.config.of('ns').of('ns').val('key', 1);
                m.config.of('ns').of('ns').val().should.be.equal(m.config.options.ns.ns);
            });
        });

        describe('.of(ns).val(k,v)', function() {
            it('should set options in namespace ns', function() {
                m.config.of('ns').of('ns').val('key', 1);
                m.config.options.ns.ns.key.should.be.equal(1);
            });
            it('should return config.of so call could be chain', function() {
                m.config.of('ns').of('ns').val('key', 1).should.be.equal(m.config.of);
            });
        });

        describe('.of(ns).val(k)', function() {
            it('should return options.ns[k]', function() {
                m.config.of('ns').of('ns').val('key').should.be.equal(1);
            });
        });
    });
});