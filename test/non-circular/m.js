var m = require('../../').module('test-circular', ['m1']);
m.config('root', __dirname);
m.server();
exports.result = 'ok';