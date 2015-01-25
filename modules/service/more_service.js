/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */
var m = require('../../base/base.js').module('built-in-service-more', ['built-in-service-base']);
m = m.load();
var formidable = require('formidable');
var emt = require('events').EventEmitter;
var swig = require('swig');
var ck = require('cookie');
var path = require('path');
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
render.text = function(string, json) {
    return swig.render(string, {
        locals: json
    });
};
m.provider('$render', render);



/*cookie*/
var cval, cwrite;
cval = function(x, y, optOrname, optVal) {
    switch (arguments.length) {
        case 1:
            return this._val[x];
        case 2:
            this._val[x] = y;
            break;
        case 3:
            this._opt[x] = optOrname;
            this._val[x] = y;
            break;
        case 4:
            this._val[x] = y;
            this._opt[x] = this._opt[x] || {};
            this._opt[x][optOrname] = optVal;
    }
    return this;
};
cwrite = function(res) {
    var s = [];
    for (var k in this._val) {
        s.push(ck.serialize(k, this._val[k], this._opt[k]));
    }
    res.setHeader('Set-Cookie', s);
    return this;
};

var cookie = function($scope) {
    var c = {};
    c._val = $scope.req.headers.cookie ? ck.parse($scope.req.headers.cookie) : {};
    c._opt = {};
    c.val = cval;
    c.write = cwrite;
    return c;
};
m.factory('$cookie', cookie);




/*static server*/
var indexFile = m.config.of('built-in').of('static-server').val('indexFile');
var processFun = m.config.of('built-in').of('static-server').val('processFun');
var idxEE = new emt();
idxEE.on('notFound', function(realPath, pathname, response) {
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.write("This request URL " + pathname + " was not found on this server.");
    response.end();
});


for (var i = 0; i < indexFile.length; i++) {
    var f = function(eidx, realPath, pathname, response) {
        var filename = realPath + 'index' + indexFile[eidx];
        fs.exists(filename, function(exists) {
            if (exists) {
                fs.readFile(filename, "binary", function(err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(JSON.stringify(err));

                    } else {
                        var pfun = processFun[indexFile[eidx]] || function(x) {
                            return x;
                        };
                        response.writeHead(200, {
                            'Content-Type': mime.lookup(filename)
                        });
                        response.write(pfun(file), "binary");
                        response.end();
                    }
                });
            } else {
                if (eidx < indexFile.length - 1)
                    idxEE.emit(eidx + 1, realPath, pathname, response);
                else
                    idxEE.emit('notFound', realPath, pathname, response);
            }
        });
    };
    idxEE.on(i, f.bind(undefined, i));
}
var sendIndex = function(realPath, pathname, response) {
    idxEE.emit(0, realPath, pathname, response);
};

var static_server = function($scope) {
    var request = $scope.req,
        response = $scope.res;
    var pathname = url.parse(request.url).pathname;
    var realPath = public + pathname;
    sendFile(realPath, pathname, response);

};
var sendFile = function(realPath, pathname, response) {
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    if (err.code == "EISDIR") {
                        if (realPath.endsWith('/'))
                            sendIndex(realPath, pathname, response);
                        else
                            sendIndex(realPath + '/', pathname, response);
                    } else {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(JSON.stringify(err));
                    }
                } else {
                    var pfun = processFun[path.extname(realPath)] || function(x) {
                        return x;
                    };
                    response.writeHead(200, {
                        'Content-Type': mime.lookup(realPath)
                    });
                    response.write(pfun(file), "binary");
                    response.end();
                }
            });
        }
    });
};
m.handler('static', static_server);



/*for parsing form*/
m.factory('$form', function($scope) {
    var form = new formidable.IncomingForm();
    return form;
});