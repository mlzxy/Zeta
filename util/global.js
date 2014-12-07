/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var get = function(e) {
    return global[e];
};

var set = function(e, v) {
    global[e] = v;
};


exports.get = get;
exports.set = set;
