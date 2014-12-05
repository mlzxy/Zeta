/*make m have post, get, options, delete methods*/
var initRoute = function(m) {
    var methods = m.save.options.handlerOpt;
    for (var i = 0; i < methods.length; i++)
        m[methods[i]] = function(path, chain) {
            myUtil.safePut(this.save.router, methods[i] + path,
                chain, "router ");
        };
};

var handlerOpt = ["get", "post", "put", "head", "delete", "options", "trace", "connect", "any"];

/*make router a module*/

// m.save.handler = {};
// m.save.provider = {};
// m.save.factory = {};
// m.save.router = {};



// m.handler = mhelper.handler;
// m.provider = mhelper.provider;
// m.factory = mhelper.factory;