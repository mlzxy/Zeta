var md = require('../base/base.js').module('m1', []);

md.h1 = function() {
    console.log(md.config('test'));
};


md.save.P = {};

md.save.P.a = 1;
