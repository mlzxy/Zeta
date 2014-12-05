var myUtil = require('../util/util.js');
var walk = require('walk');
var options = require('../util/options.js');





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
var load = function(mMap, newOpt) { //need add require('npm module')
    if (mMap === undefined) {
        mMap = getmMap(this.config("ROOT"));
    }
    var deps = this.dependent;
    var oldOpt = this.config.options;
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


var mergeModule = function(m) {
    var mysave = this.save,
        hesave = m.save;
    mysave.handler = myUtil.safeCopy(mysave.handler, hesave.handler, "handler ");
    mysave.provider = myUtil.safeCopy(mysave.provider, hesave.provider, "provider ");
    mysave.factory = myUtil.safeCopy(mysave.factory, hesave.factory, "factory ");
    mysave.router = myUtil.safeCopy(mysave.router, hesave.router, "router ");
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