var P = /\((.|\n|\t)*\)\ *\{/;
var getArguments = function(f) {
    var source = f.toString();
    var argStr = source.match(P);
    var arg = removeALL(argStr[0], '(', ')', ' ', '\n', '\t', '{');
    arg = arg.split(',');
    var rs = [];
    for (var s = 0; s < arg.length; s++) {
        arg[s] = arg[s].trim();
        if (arg[s].length !== 0) {
            rs.push(arg[s]);
        }
    }
    return rs;
};

var remove = function(str, c) {
    return str.replace(c, '');
};

var removeALL = function(str) {
    var t = str,
        i = 1;
    while (i < arguments.length) {
        t = remove(t, arguments[i]);
        i = i + 1;
    }
    return t;
};


exports.getArguments = getArguments;