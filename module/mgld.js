var route = require('../route/router.js');
var myutil = require('../util/util.js');
var walk = require('walk');
var MOD_NAME = 'mgld';
var MODULE_OVERRIDE = "module_override";

var handler = function(hName, handle) {
    if (this.handleMap[hName] !== undefined) {
        myutil.warn("Override found in handler services: " + hName + "\nby Module: " + this.name + "\nPlease Be Careful:D");
    } else {
        this.handleMap[hName] = handle;
    }
};

var factory = function(fName, fac) {
    if (this.serviceMap[fName] !== undefined) {
        myutil.error("Conflicts in the services: " + fName + "\n by Module" + this.name + "\nNotice that you could NOT have same names between factories and providers:(");
    } else {
        this.serviceMap[fName] = fac;
    }
};

var provider = factory;


/*decide to use light-router :)*/
var handleOptions = ["get", "post", "put", "head", "delete", "options", "trace", "connect"];
var routeFunPack = function(m) {
    for (var i = 0; i < handleOptions.length; i++) {
        m[handleOptions[i]] = function(path, obj) {
            m.routeMap[path] = {
                fun: obj,
                method: handleOptions[i]
            };
        };
    }
};



/*merge two modules*/
var mergeMod = function(m1, m2) {
    // m.serviceMap = {};
    // m.handleMap = {};
    // m.routeMap = {};
    var arr = [{
        name: 'services',
        m1: m1.serviceMap,
        m2: m2.serviceMap
    }, {
        name: 'handlers',
        m1: m1.handleMap,
        m2: m2.handleMap
    }, {
        name: 'routers',
        m1: m1.routeMap,
        m2: m2.routeMap
    }];
    ///////nested copy///////////////
    for (var i = 0; i < arr.length; i++) {
        var tm1 = arr[i].m1,
            tm2 = arr[i].m2,
            name = arr[i].name;
        for (var v in tm2)
            if (tm1[v] !== undefined) {
                myutil.error("Conflicts in the " + name + ": " + v + "\nBetween Module:" + m1.name + " and Module:" + m2.name);
            } else {
                tm1[v] = tm2[v];
            }
    }
    ////////////////////////////////
    return m1;
};


/*get a single module based on the module name*/
var requireMod = function(mName) {
    // todo
    // 最简单方法是递归向下查找, 直到找到.
    // 就这么实现吧, 千万不要preoptimize
    var result;

    var walk_options = {
        listeners: {
            file: function(root, stat, next) {
                var filename = root + '/' + stat.name;
                if (!myutil.isHidden(filename) && stat.name.endsWith(".js")) {
                    try {
                        var m = require(filename);
                        if (m.module !== undefined && m.module.name == mName) {
                            if (result === undefined)
                                result = m;
                            else
                                throw {
                                    name: MODULE_OVERRIDE,
                                    message: "Override in modules founded! Module Name:" + m.module.name + "\nPlease by careful"
                                };
                        }
                    } catch (e) {
                        if (e.name == MODULE_OVERRIDE)
                            myutil.error(e.message);
                        else
                            myutil.error("Module: " + filename + "\ncould not be loaded.");
                    }
                }
                next();
            }
        }
    };
    walk.walkSync(".", walk_options);
    return result;
};




/*return a single module object*/
var depModules = function(mArray) {
    var m = {};
    for (var i = 0; i < mArray.length; i++) {
        m = mergeMod(m, requireMod(mArray[i]));
    }
    return m;
};



var module = function(mName, mArray) {
    var m = {};
    m.name = mName;
    m.dependent = mArray;
    m.provider = provider;
    m.handler = handler;
    m.factory = factory;
    /**********************/
    m.serviceMap = {};
    m.handleMap = {};
    m.routeMap = {};
    m = routeFunPack(m);
    /**********************/
    var depM = depModules(mArray);
    m = mergeMod(m, depM);

    return m;
};


exports.module = module;
exports.MOD_NAME = MOD_NAME;