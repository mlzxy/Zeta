var myUtil = require('../util/util.js');
var walk = require('walk');
var options = reqiure('../util/options.js');
var rt = require('../route/router.js');

var getmMap = function(path) {
    var mMap = {};

    var ff = function(root, stat, next) {
        var filename = root + '/' + stat.name;
        if (!myUtil.isHidden(filename) && filename.endsWith(".js")) {
            var md = myUtil.quiteRequire(filename);
            if (md !== undefined && md.name !== undefined)
                mMap[md.name] = md;
        }
        next();
    };
    var walk_options = {
        listeners: {
            file: ff
        }
    };
    walk.walkSync(path, walk_options);
    return mMap;
};

/*start up functions!
mMap {mname : module itself}
 */
var load = function(mMap, newOpt) {
    if (mMap === undefined) {
        mMap = getmMap(this.config("ROOT"));
    }
    var deps = this.dependent;
    var oldOpt = this.save.options;
    if (newOpt === undefined)
        newOpt = oldOpt;
    else {
        newOpt = myUtil.updateOptions(oldOpt, options.removeDefault(newOpt));
    }
    for (var i = 0; i < deps.length; i++) {
        var md = mMap[deps[i]].load(mMap, newOpt);
        md = md.init();
        this.merge(md);
    }
    return this;
};



var server = function() {
    this.load();
    var router = rt.mkRouter(this);
    return router;
};
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
        m[methods[i]] = function(path, chain) {
            myUtil.safePut(this.save.router, methods[i] + path,
                chain, "router ");
        };
};

var merge = function(m) {
    var mysave = this.save,
        hesave = m.save;
    mysave.handler = myUtil.safeCopy(mysave.handler, hesave.handler, "handler ");
    mysave.provider = myUtil.safeCopy(mysave.provider, hesave.provider, "provider ");
    mysave.factory = myUtil.safeCopy(mysave.factory, hesave.factory, "factory ");
    mysave.router = myUtil.safeCopy(mysave.router, hesave.router, "router ");
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
    m.merge = merge;
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