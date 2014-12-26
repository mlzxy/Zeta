/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var myUtil = require('../util/util.js');
var mhlp = require('./mhelper.js');
var options = require('../util/options.js');
var cfg = require('../util/config.js');
var print = require('../util/print.js');
var startload, endload;

var load = function() {
    print.loading(this);
    var masterLoad = false;
    if (global.mMap === undefined) {
        global.mMap = mhlp.init_mMap(this.config('root'));
        masterLoad = true;
        global.mOpt = this.config.options;
    }
    var mOpt = global.mOpt;
    mhlp.updateOptions(this.config.options, mOpt);
    if (this.config(options.circleCheck))
        mhlp.circle(this.name, []);

    var deps = this.dependent,
        mMap = global.mMap;

    for (var i = 0; i < deps.length; i++) {
        var fname = mMap[deps[i]] || deps[i]; //maybe is a npm module or build in modules that not locate in current working directory

        myUtil.safeRequire(fname); //only use the safeRequire here
        var md = global.mgld[deps[i]];
        if (md === undefined) { //means circular, because of nodejs require mechanism
            if (!this.config(options.circleCheck)) {
                if (deps.length === 1 && i === 0) { //only one dependence and it's also circular
                    deps.push(cfg.builtin);
                }
                print.warn("Maybe there has some circular dependencies in the modules you used, in this case, config " + options.circleCheck + " to be true and you could see the problem.\n");
                print.detail("In here, we assume it's ok, skip the problem and try to continue.");
                continue;
            }
            print.loadErr(deps[i]);
            throw new Error('The module: ' + deps[i] + ' could not be loaded.');
        }
        md = md.init();
        mhlp.mergeModule(this, md);
        print.loaded(deps[i]);
    }

    if (masterLoad) {
        if (this.config('loadinfo')) {
            this.loadinfo = {};
            this.loadinfo.mMap = global.mMap;
            this.loadinfo.mgld = global.mgld; //save information
        }
        //now have to invalidate the cache and reset environment
        mhlp.resetEnv(this.name);
        endload = new Date();
        // print.loaded(this);
        print.finish(this, endload - startload);
    } else {
        global.mgld[this.name] = this;
    }
    return this;
};

var init = function(m) {
    m.init = function() {
        return this;
    };
    m.i = m.init;
    m.load = load;
    m.l = load;
    m.config = function(name, val) {
        var rt;
        switch (arguments.length) {
            case 0:
                rt = this.config.options;
                break;
            case 1:
                rt = this.config.options[name];
                break;
            case 2:
                this.config.options[name] = val;
                rt = this;
                break;
            default:
                rt = this;
        }
        return rt;
    };
    m.c = m.config;
    m.config.options = new options.initOptions();


    m.config.of = function(space) {
        this.of._nspstack = [space];
        return this.of;
    };
    m.config.of.options = m.config.options;
    m.config.of._nspstack = [];

    m.config.of.of = function(space) {
        this._nspstack.push(space);
        return this;
    };
    m.config.of.val = function(name, val) {
        var rt;
        var attrStack = this._nspstack.slice();
        attrStack.push(name);
        switch (arguments.length) {
            case 0:
                rt = myUtil.getAttr(this.options, this._nspstack);
                break;
            case 1:
                rt = myUtil.getAttr(this.options, attrStack);
                break;
            case 2:
                myUtil.setAttr(this.options, attrStack, val);
                var opt = this.options;
                for (var i = 0; i < this._nspstack.length; i++) {
                    opt[this._nspstack[i]]._isNamespace = true;
                    opt = opt[this._nspstack[i]];
                }
                rt = this;
                break;
            default:
                rt = this;
        }


        return rt;
    };

    return m;
};

var module = function(mname, mnArr) {
    if (global.mgld === undefined) {
        global.mgld = {};
        global.ngld = {};
        startload = new Date();
    }
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    global.ngld[m.name] = m;
    if (m.dependent.length === 0 && !cfg.isBuiltin(m)) {
        m.dependent = [cfg.builtin];
    }
    /*the ngld here is to log module loading order*/
    return m;
};

exports.module = module;