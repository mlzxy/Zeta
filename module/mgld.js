var myUtil = require('../util/util.js');
var walk = require('walk');
var options = require('../util/options.js');

//get all modules inside certain path, return mMap {mname : module itself}
var getmMap = function(path, dependent) {
    var mMap = {};

    for (var i = 0; i < dependent.length; i++) {
        var md = myUtil.quiteRequire(dependent[i]);
        if (md !== undefined && md.name !== undefined)
            myUtil.safePut(mMap, md.name, md, "module:" + md.name);
    }

    var ff = function(root, stat, next) {
        var filename = root + '/' + stat.name;
        if (!myUtil.isHidden(filename) && filename.endsWith(".js")) {
            var md = myUtil.quiteRequire(filename);
            if (md !== undefined && md.name !== undefined)
                myUtil.safePut(mMap, md.name, md, "module:" + md.name);
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

//merge except the config, and init, merge m2 into m1
var except = {
    config: 1,
    init: 1,
    save: 1
};
var mergeModule = function(m1, m2) {
    for (var v in m2) {
        if (!except[v]) {
            m1[v] = m2[v];
        }
    }
    var s1 = m1.save,
        s2 = m2.save;
    for (var u in s2) {
        myUtil.safeCopy(s1[u], s2[u], s2[u].name);
    }
    return m1;
};









var load = function(mMap, newOpt) { //need add require('npm module')
    if (mMap === undefined) {
        mMap = getmMap(this.config("ROOT"), this.dependent);
    }
    if (newOpt !== undefined) {
        this.config.options = myUtil.updateOptions(this.config.options, options.removeDefault(newOpt));
    }

    var deps = this.dependent;
    for (var i = 0; i < deps.length; i++) {
        if (mMap[deps[i]] === undefined) {
            var msg = "the Dependent:" + deps[i] + " of module:" + this.name + " could not be loaded, so sorry for you :(";
            myUtil.error(msg);
            throw new Error(msg);
        }
    }

    for (var j = 0; j < deps.length; i++) {
        var md = mMap[deps[i]].load(mMap, this.config.options);
        md = md.init();
        mergeModule(this, md);
    }
    return this;
};

var config = function(nameObj, val) {
    if (arguments.length == 1) {
        return this.config.options[nameObj];
    } else {
        this.config.options[nameObj] = val;
    }
    return undefined;
};

var init = function(m) {
    m.save = {};
    m.init = function() {
        return this;
    };
    m.load = load;
    m.config = config;
    m.config.options = myUtil.clone(options.defalta);
    return m;
};

var module = function(mname, mnArr) {
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    if (myUtil.getEnv(options.LOAD_MARK) != options.LOADED) {
        myUtil.setEnv(options.LOAD_MARK, options.LOADED);
        m = m.load();
        myUtil.setEnv(options.LOAD_MARK, options.NOT_LOADED);
    }
    return m;
};

exports.module = module;

// need to translate "." into absolute path-> pwd
// set default modules:server in options
/*would be
module('service',[]); // the handler stuffs
module('teamplate',['service']); // the templating stuffs
module('server',['teamplate','service']) // the routing stuffs

*/