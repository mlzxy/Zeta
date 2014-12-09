var m = require('../../').module('test-circular',['m1']);
m.config('root',__dirname);
m.server();

console.log('should not reach here');
