/*!
 * gliding
 * Copyright(c) 2014-2015 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */

var mBuiltin = {};

mBuiltin['built-in-service-base'] = __dirname + '/' + '../modules/service/service.js';
mBuiltin['built-in-service-more'] = __dirname + '/' + '../modules/service/more_service.js';
mBuiltin['built-in-router'] = __dirname + '/' + '../modules/route/route.js';




exports.builtin = ["built-in-router"];
exports.isBuiltin = function(m) {
    return mBuiltin[m.name] !== undefined;
};
exports.mBuiltin = mBuiltin;