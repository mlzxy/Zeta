/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */

var mBuiltin = {};
var methods = ["get", "post", "put", "head", "delete", "options", "trace", "connect"];


mBuiltin['built-in-service-base'] = __dirname + '/' + '../modules/service/service.js';
mBuiltin['built-in-service-more'] = __dirname + '/' + '../modules/service/more_service.js';
mBuiltin['built-in-router'] = __dirname + '/' + '../modules/route/route.js';
mBuiltin['built-in-error-handle'] = __dirname + '/' + '../modules/errHandle/errhandle.js';



exports.builtin = "built-in-error-handle";
exports.isBuiltin = function(m) {
    return mBuiltin[m.name] !== undefined;
};
exports.mBuiltin = mBuiltin;
exports.methods = methods;