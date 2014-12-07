var myUtil = require('../util/util.js');
var mhlp = require('./mhelper.js');
var options = require('../util/options.js');
var glb = require('../util/global.js');
var cfg = require('../util/config.js');


var load = function() {
    var masterLoad = false;
    if (glb.get('mMap') === undefined) {
        glb.set('mMap', mhlp.init_mMap(this.config.options.root));
        masterLoad = true;
    }
    var mOpt = glb.get('mOpt');
    if (mOpt !== undefined) {
        myUtil.updateOptions(this.config.options, options.removeDefault(mOpt));
    }
    glb.set('mOpt', this.config.options);

    var deps = this.dependent,
        mMap = glb.get('mMap');

    for (var i = 0; i < deps.length; i++) {
        var fname = mMap[deps[i]];
        if (fname === undefined) //maybe is a npm module or build in modules that not locate in current working directory
            fname = deps[i];
        /*==============================*/
        myUtil.safeRequire(fname);
        var md = glb.get('mgld')[deps[i]];
        glb.set('mOpt', this.config.options); // the previous mOpt may get overrided
        md = md.init();
        mhlp.mergeModule(this, md);
    }

    if (masterLoad) {
        glb.set('mMap', undefined);
        glb.set('mOpt', undefined);
        glb.set('mgld', undefined);
    }
    return this;
};


var config = function(name, val) {
    if (arguments.length == 1) {
        return this.config.options[name];
    } else {
        this.config.options[name] = val;
    }
    return undefined;
};

var init = function(m) {
    m.save = {};
    m.init = function() {
        return this;
    };
    m.load = load;
    m.server = load;
    m.config = config;
    m.config.options = myUtil.clone(options.defalta);
    return m;
};

var module = function(mname, mnArr) {
    var mgld = glb.get('mgld');
    var masterLoad = false;
    if (mgld === undefined) {
        mgld = {};
        glb.set('mgld', mgld);
        masterLoad = true;
    }
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    if (m.dependent.length === 0) {
        m.dependent = myUtil.clone(cfg.buildin);
    }

    if (!masterLoad) { //因为有options要传出, 所以master要显示load, 不能在这里自动load, 这样可以很好的解决,
        m = m.load();
        mgld = glb.get('mgld');
        mgld[m.name] = m;
        glb.set('mgld', mgld);
    }
    return m;
};

exports.module = module;
//希望load函数能接受别人传递过来的options-> 这个没难度, 那样完全灵活度
// 难在如何开始的时候就把config传出去