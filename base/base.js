/*!
 * glider
 * Copyright(c) 2014 Xinyu Zhang bevis@mail.ustc.edu.cn
 * MIT Licensed
 */
var myUtil = require('../util/util.js');
var mhlp = require('./mhelper.js');
var options = require('../util/options.js');
var glb = require('../util/global.js');
var cfg = require('../util/config.js');
var print = require('../util/print.js');

var load = function() {
    var masterLoad = false;
    if (glb.get('mMap') === undefined) {
        glb.set('mMap', mhlp.init_mMap(this.config('root')));
        masterLoad = true;
        print.loading(this);
    }
    var mOpt = glb.get('mOpt');

    if (mOpt !== undefined) {
        myUtil.updateOptions(this.config.options, options.removeDefault(mOpt));
    }
    glb.set('mOpt', this.config.options);
    if (this.config('checkCircular'))
        mhlp.circle(this.name, []); // check circular


    var deps = this.dependent,
        mMap = glb.get('mMap');

    for (var i = 0; i < deps.length; i++) {
        var fname = mMap[deps[i]];
        if (fname === undefined) //maybe is a npm module or build in modules that not locate in current working directory
            fname = deps[i];

        var md = myUtil.safeRequire(fname); //then the question is why safeRequire return when we have circular dependency, it should go in infinity
        if (!md.config) // if config exist, then should be a builtin mod
            md = glb.get('mgld')[deps[i]]; //if not builtin, then we could get it from global cache
        glb.set('mOpt', this.config.options); // the previous mOpt may get overrided
        if (md === undefined)
            throw new Error("Error Occur, load module:" + deps[i] + " failed, maybe there has some circular dependencies in the modules you used, so in this case please do not config the checkCircular to be false! \n");
        md = md.init();
        mhlp.mergeModule(this, md);
    }

    if (masterLoad) {
        this.loadinfo = {};
        this.loadinfo.mMap = glb.get('mMap');
        this.loadinfo.mgld = glb.get('mgld');
        glb.set('mMap', undefined);
        glb.set('mOpt', undefined);
        glb.set('mgld', undefined);
        glb.set('ngld', undefined);
        cfg.endload = new Date();
        print.loaded(this);
        print.finish(this, cfg.endload - cfg.startload);
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
        glb.set('ngld', {});
        masterLoad = true;
        cfg.startload = new Date();
    }
    var m = {};
    m = init(m);
    m.name = mname;
    m.dependent = mnArr;
    if (m.dependent.length === 0 && arguments[2] != cfg.iambuiltin) {
        m.dependent.push(cfg.builtin);
    }

    if (!masterLoad) { //since you still need to config, so the master load should be executed manually when finish configuration.
        var ngld = glb.get('ngld');
        ngld[m.name] = m;
        glb.set('ngld', ngld);
        /*the ngld here is to log module loading order*/
        print.loading(m);
        m = m.load();
        print.loaded(m);

        mgld = glb.get('mgld');
        mgld[m.name] = m;
        glb.set('mgld', mgld);
    }
    return m;
};

exports.module = module;