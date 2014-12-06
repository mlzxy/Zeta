var get = function(e) {
    return global[e];
};

var set = function(e, v) {
    global[e] = v;
};


exports.get = get;
exports.set = set;