var myUtil = require('../util/util.js');
var mhlp = require('./mhelper.js');
var options = require('../util/options.js');
var store = require('../util/store.js'); //store into node runtime env, just like create global var


var load = function() {
    var masterLoad = false;
    if (store.get('mMap') === undefined) {
        store.set('mMap', mhlp.init_mMap());
        masterLoad = true;
    }
    var mOpt = store.get('mOpt');
    if (mOpt !== undefined) {
        myUtil.updateOptions(this.config.options, options.removeDefault(mOpt));
    }
    store.set('mOpt', this.config.options);

    var deps = this.dependent,
        mMap = store.get('mMap');
    for (var i = 0; i < deps.length; i++) { //require it, init it, merge it
        var fname = mMap[deps[i]];
        if (fname === undefined) //maybe is a npm module not a file path
            fname = deps[i];
        var md = myUtil.safeRequire(fname);
        store.set('mOpt', this.config.options); // it would be override
        md = md.init();
        mhlp.mergeModule(this, md);
    }

    if (masterLoad) {
        store.set('mMap', undefined);
        store.set('mOpt', undefined);
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
    m.config = config;
    m.config.options = myUtil.clone(options.defalta);
    return m;
};

var module = function(mname, mnArr) {
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    m = m.load();
    return m;
};

exports.module = module;