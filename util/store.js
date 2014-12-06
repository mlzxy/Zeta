var get = function(e) {
    return path[e];
};

var set = function(e, v) {
    path[e] = v;
};


exports.get = get;
exports.set = set;