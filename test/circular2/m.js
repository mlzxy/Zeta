var m = require('../../').module('test-circular', ['m1']);
m.config('root', __dirname);
m.config('circleCheck', false);
m.load();
exports.result = 'ok';