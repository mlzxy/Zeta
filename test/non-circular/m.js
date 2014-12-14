var m = require('../../').module('test-circular', ['m1']);
m.config('root', __dirname);
m.load();
exports.result = 'ok';