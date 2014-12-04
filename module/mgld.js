var myUtil = require('../util/util.js');
var walk = require('walk');
var options = reqiure('../util/options.js');



var getmMap = function(path) {
    var mMap = {};

    var ff = function(root, stat, next) {
        var filename = root + '/' + stat.name;
        console.log(filename);
        next();
    };
    var x = [];
    var fd = function(root, dirStatsArray, next) {
        x.push(dirStatsArray);
        console.log(dirStatsArray);
        next();
    };

    var walk_options = {
        listeners: {
            file: ff,
            directories: fd
        }
    };
    walk.walkSync(path, walk_options);
    return mMap;
};



/*start up functions!
mMap {mname : module itself}
*/
var load = function(mMap) {
    if (mMap === undefined) {
        mMap = getmMap(this.config("ROOT"));
    }



};
var server = load;

/*modify m.save.options*/
var config = function(nameObj, val) {
    if (arguments.length == 1) {
        return this.save.options[nameObj];
    } else {
        this.save.options[nameObj] = val;
    }
    return undefined;
};


/*just save*/
var handler = function(hname, f) {
    myUtil.safePut(this.save.factory, hname, f, "provider ");
};

var factory = function(fname, of) {
    myUtil.safePut(this.save.factory, fname, of, "provider ");
};

var provider = function(pname, of) {
    myUtil.safePut(this.save.provider, pname, of, "provider ");
};


/*make m have post, get, options, delete methods*/
var initRoute = function(m) {
    var methods = m.save.options.handlerOpt;
    for (var i = 0; i < methods.length; i++)
        m[methods[i]] = function(path, f) {
            myUtil.safePut(this.save.router, path, {
                method: methods[i],
                handler: f
            }, "router " + methods[i]);
        };
};

var init = function(m) {
    // saving
    m.save = {};
    m.save.options = options.defalta;
    m.save.handler = {};
    m.save.provider = {};
    m.save.factory = {};
    m.save.router = {};
    // method
    m.init = function() { //use this to make users to implement plugin easily, internally, call m.config(father options) before init
        return this;
    };
    /*=============*/
    m.handler = handler;
    m.provider = provider;
    m.factory = factory;
    m.load = load;
    m.server = server;
    m.config = config;
    m = initRoute(m);
    return m;
};


var module = function(mname, mnArr) {
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    return m;
};


exports.module = module;
