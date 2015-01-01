var swig = require('swig'),
    fs = require('fs'),
    mime = require('mime');

var cache = {},
    cacheTime = {},
    cacheMime = {};


var render = function(file, json) {
    var self = this,
        path = this._public + file;
    if (cacheTime[file]) {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
            else {
                if (stat.mtime == cacheTime[file]) {
                    self.end(swig.render(cache[file], {
                        locals: json
                    }));
                } else {
                    fs.readFile(path, function(err, data) {
                        if (err)
                            self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
                        else {
                            cacheTime[file] = stat.mtime;
                            cacheMime[file] = mime.lookup(path);
                            cache[file] = data instanceof Buffer ? data.toString() : data;
                            self.end(swig.render(cache[file], {
                                locals: json
                            }));
                        }
                    });
                }
            }
        });
    } else {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
            else {
                fs.readFile(path, function(err, data) {
                    if (err)
                        self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
                    else {
                        cacheTime[file] = stat.mtime;
                        cacheMime[file] = mime.lookup(path);
                        cache[file] = data instanceof Buffer ? data.toString() : data;
                        self.end(swig.render(cache[file], {
                            locals: json
                        }));
                    }
                });
            }
        });
    }
    return this;
};

var sendFile = function(file) {
    var self = this,
        path = this._public + file;
    if (cacheTime[file]) {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
            else {
                if (stat.mtime == cacheTime[file]) {
                    self.head('Content-Type', cacheMime[file])
                        .end(cache[file]);
                } else {
                    fs.readFile(path, function(err, data) {
                        if (err)
                            self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
                        else {
                            cacheTime[file] = stat.mtime;
                            cacheMime[file] = mime.lookup(path);
                            cache[file] = data;
                            self.head('Content-Type', cacheMime[file])
                                .end(cache[file]);
                        }
                    });
                }
            }
        });
    } else {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
            else {
                fs.readFile(path, function(err, data) {
                    if (err)
                        self.status(500).end('Server Internal Error: ' + JSON.stringify(err));
                    else {
                        cacheTime[file] = stat.mtime;
                        cacheMime[file] = mime.lookup(path);
                        cache[file] = data;
                        self.head('Content-Type', cacheMime[file])
                            .end(cache[file]);
                    }
                });
            }
        });
    }
    return this;
};


exports.render = render;
exports.sendFile = sendFile;