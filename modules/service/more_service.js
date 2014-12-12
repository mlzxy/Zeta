/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var m = require('../../base/base.js').module('built-in-service-more', ['built-in-service-base']);
var formidable = require('formidable');
var swig = require('swig');
var ck = require('cookie');
var mime = require('mime');
var fs = require('fs');
var url = require('url');

/*template*/
var cache = {};
var public = m.config('public') || "public";
var render = function(fpath, json) {
    var tpl = cache[fpath];
    if (tpl === undefined) {
        var lfpath = public + fpath;
        tpl = swig.compileFile(lfpath);
        cache[fpath] = tpl;
    }
    return tpl(json);
};
render.renderHTML = function(string, json) {
    return swig.render(string, {
        locals: json
    });
};
m.provider('$render', render);



/*cookie*/
var cget, cset, cwrite;
cget = function(x) {
    return this.val[x];
};

cset = function(x, y) {
    this.val[x] = y;
    return this;
};
cwrite = function(res) {
    var s = [];
    for (var k in this.val) {
        s.push(ck.serialize(k, this.val[k]));
    }
    res.setHeader('Set-Cookie', s);
    return this;
};

var cookie = function($scope) {
    var c = {};
    c.val = $scope.req.headers.cookie ? ck.parse($scope.req.headers.cookie) : {};
    c.get = cget;
    c.set = cset;
    c.write = cwrite;
    return c;
};
m.factory('$cookie', cookie);




/*static server*/
var static_server = function($scope) {
    var request = $scope.req,
        response = $scope.res;
    var pathname = url.parse(request.url).pathname;
    var realPath = public + pathname;
    path.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {
                    var contentType = mime.lookup(realPath);
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
};
m.handler('static', static_server);




/*for parsing form*/
m.factory('$form', function() {
    var form = new formidable.IncomingForm();
    return form;
});