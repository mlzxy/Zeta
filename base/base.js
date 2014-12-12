/*!
 * gliding
 * Copyright(c) 2014-2015 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var myUtil = require('../util/util.js');
var mhlp = require('./mhelper.js');
var options = require('../util/options.js');
var cfg = require('../util/config.js');
var print = require('../util/print.js');
var startload, endload;

var load = function() {
    var masterLoad = false;
    if (global.mMap === undefined) {
        print.loading(this);
        global.mMap = mhlp.init_mMap(this.config('root'));
        masterLoad = true;
        global.mOpt = this.config.options;
    }
    var mOpt = global.mOpt;
    myUtil.updateObj(this.config.options, mOpt);
    if (this.config(options.circleCheck))
        mhlp.circle(this.name, []);

    var deps = this.dependent,
        mMap = global.mMap;
    for (var i = 0; i < deps.length; i++) {
        var fname = mMap[deps[i]] || deps[i]; //maybe is a npm module or build in modules that not locate in current working directory

        myUtil.safeRequire(fname);
        var md = global.mgld[deps[i]];
        if (md === undefined && !this.config(options.circleCheck)) { //means circular, because of nodejs require mechanism
            if (deps.length === 1 && i === 0) { //only one dependence and it's also circular
                deps.push(cfg.builtin);
            }
            print.warn("Maybe there has some circular dependencies in the modules you used, in this case, config " + options.circleCheck + " to be true and you could see the problem.\n");
            print.detail("In here, we assume it's ok, skip the problem and try to continue.");
            continue;
        }
        md = md.init();
        debugger;
        mhlp.mergeModule(this, md);

    }

    if (masterLoad) {
        this.loadinfo = {};
        this.loadinfo.mMap = global.mMap;
        this.loadinfo.mgld = global.mgld; //save information
        global.mMap = global.mOpt = global.mgld = global.ngld = undefined;
        endload = new Date();
        print.loaded(this);
        print.finish(this, endload - startload);
    }
    return this;
};




var init = function(m) {
    m.save = {};
    m.init = function() {
        return this;
    };
    m.load = load;
    m.server = load;
    m.config = function(name, val) {
        var rt;
        switch (arguments.length) {
            case 1:
                rt = this.config.options[name];
                break;
            case 2:
                this.config.options[name] = val;
                break;
            case 0:
                rt = this.config.options;
                break;
            default:
        }
        return rt;
    };
    m.config.options = new options.initOptions();
    return m;
};

var module = function(mname, mnArr) {
    var mgld = global.mgld;
    var masterLoad = false;
    if (mgld === undefined) {
        mgld = {};
        global.mgld = mgld;
        global.ngld = {};
        masterLoad = true;
        startload = new Date();
    }
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    if (m.dependent.length === 0 && !cfg.isBuiltin(m)) {
        m.dependent = [cfg.builtin];
    }
    if (!masterLoad) { //since you still need to config, so the master load should be executed manually when finish configuration. eg: m.server() //server === load
        var ngld = global.ngld;
        ngld[m.name] = m;
        global.ngld = ngld;
        /*the ngld here is to log module loading order*/
        print.loading(m);
        m = m.load();
        print.loaded(m);
        mgld = global.mgld;
        mgld[m.name] = m;
        global.mgld = mgld;
    }
    return m;
};

exports.module = module;