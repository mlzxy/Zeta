var Zeta = require('../../../'),
    chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    m = Zeta.module('npmTest', ['mnpm']);

m.load();

describe('load Npm module test', function() {
    it('should be able to load npm module as its dependent', function() {
        assert.isTrue(m.fromNpmModule);
    });
});
