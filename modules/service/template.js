/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var m = require('../../base/base.js').module('built-in-service-template', [__dirname + '/service.js']);
var swig = require('swig');
var fs = require('fs');


var cache = {};
var root = m.config('public') || "public";
var render = function(fpath, json) {
    var tpl;
    fpath = root + fpath;
    if (tpl !== undefined) {
        tpl = cache[fpath];
    } else {
        tpl = swig.compileFile(fs.readFileSync(fpath));
        cache[fpath] = tpl;
    }
    return tpl(json);
};


render.renderHTML = function(string, json) {
    return swig.render(string, {
        locals: json
    });
};

m.provider('$render', render);



module.exports = exports = m;