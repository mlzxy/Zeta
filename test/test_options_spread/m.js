var m = require('../../').module('test-circular', ['m1']);
m.config('root', __dirname);
m.config('test_options_spread', true);
m.server();