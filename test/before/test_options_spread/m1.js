var m = require('../../').module('m1', ['m2', 'm3']);
console.log(m.config('test_options_spread'));
m.config('test_options_spread', false);
m.l();