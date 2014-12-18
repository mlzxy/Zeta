var domain = require('domain'),
    print = require('../../util/print.js'),
    events = require('events'),
    myUtil = require('../../util/util.js'),
    methods = require('../../util/config.js').methods,
    m = require('../../base/base.js').module('built-in-error-handle', ['built-in-router']);

m.load();


var msg = 'In fact, use one single global domain for your global EventEmitter instances for exception handling would not work properly, ' +
    'that\'s because of the very hardness of async exception handling from with nodejs events mechanism, ' +
    'see more in our documentation and http://nodejs.org/api/domain.html';
var msg2 = 'Moreover, if you insist on doing this, you could only add EventEmitter Instances into the global domain, otherwise would be skipped';
/*=============== error handling =======================*/
m.save.domain = {};
m.save.domain.global = domain.create(); //not recommend to use !!
m.save.domain.router = {};
m.save.domain.handler = [];


var guard,
    dr = m.save.domain.router, // {}
    dh = m.save.domain.handler, //[]
    gdm = m.save.domain.global,
    stack = [];

gdm.on('error', function(err) {
    print.warn('Global Domain catch error, means there is an exception thrown by your program, other than the http request and http response.');
    print.printErr(err);
    throw err;
});


for (var i = 0; i < methods.length; i++)
    dr[methods[i]] = {};
dr.any = {};


m.g = m.guard = guard =
    function(ee) {
        print.warn(msg);

        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof events.EventEmitter) {
                gdm.add(arguments[i]);
            } else {
                print.warn(msg2);
            }
        }
        return this;
    };

var addItem = function(method, path) {
    if (arguments.length == 2) {
        stack.push({
            method: method,
            path: path
        });
    } else {
        var hmap = m.save.router[method];
        for (var p in hmap) {
            addItem(method, p);
        }
    }
};


var w = function(f) { //f is a handler function
    myUtil.checkErr(!myUtil.isFunction(f), 'You could not guard your server with a non-function object :(');
    var hidx = dh.length;
    dh.push(f);
    for (var i = 0; i < stack.length; i++) {
        var e = stack[i];
        dr[e.method][e.path] = hidx; //override is possible
    }
    stack = [];
};
guard.with = guard.w = w;








//and the m.save.domain.router.any is still special



guard[methods[0]] = function(path, f) {
    if (!path) { //put every method[0] paths into the stack
        addItem(methods[0]);
    } else if (!f) {
        addItem(methods[0], path);
    } else {
        addItem(methods[0], path);
        m[methods[0]](path, f);
    }
    return this;
};
guard[methods[1]] = function(path, f) {
    if (!path) { //put every method[1] paths into the stack
        addItem(methods[1]);
    } else if (!f) {
        addItem(methods[1], path);
    } else {
        addItem(methods[1], path);
        m[methods[1]](path, f);
    }
    return this;
};
guard[methods[2]] = function(path, f) {
    if (!path) { //put every method[2] paths into the stack
        addItem(methods[2]);
    } else if (!f) {
        addItem(methods[2], path);
    } else {
        addItem(methods[2], path);
        m[methods[2]](path, f);
    }
    return this;
};
guard[methods[3]] = function(path, f) {
    if (!path) { //put every method[3] paths into the stack
        addItem(methods[3]);
    } else if (!f) {
        addItem(methods[3], path);
    } else {
        addItem(methods[3], path);
        m[methods[3]](path, f);
    }
    return this;
};
guard[methods[4]] = function(path, f) {
    if (!path) { //put every method[4] paths into the stack
        addItem(methods[4]);
    } else if (!f) {
        addItem(methods[4], path);
    } else {
        addItem(methods[4], path);
        m[methods[4]](path, f);
    }
    return this;
};
guard[methods[5]] = function(path, f) {
    if (!path) { //put every method[5] paths into the stack
        addItem(methods[5]);
    } else if (!f) {
        addItem(methods[5], path);
    } else {
        addItem(methods[5], path);
        m[methods[5]](path, f);
    }
    return this;
};
guard[methods[6]] = function(path, f) {
    if (!path) { //put every method[6] paths into the stack
        addItem(methods[6]);
    } else if (!f) {
        addItem(methods[6], path);
    } else {
        addItem(methods[6], path);
        m[methods[6]](path, f);
    }
    return this;
};
guard[methods[7]] = function(path, f) {
    if (!path) { //put every method[7] paths into the stack
        addItem(methods[7]);
    } else if (!f) {
        addItem(methods[7], path);
    } else {
        addItem(methods[7], path);
        m[methods[7]](path, f);
    }
    return this;
};

guard.any = function(f) {
    if (f) {
        m.any(f);
    }
    addItem("any", "any");
    return this;
};