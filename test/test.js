var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();





describe('Circular Dependency ', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        })
    })
})