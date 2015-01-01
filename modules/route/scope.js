var swig = require('swig'),
    fs = require('fs');

var cache = {},
    cacheTime = {},
    public;


var render = function(file, json) {
    var self = this,
        path = public + file;
    if (cacheTime[file]) {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error');
            else {
                if (stat.mtime == cacheTime[file]) {
                    self.end(swig.render(cache[file], {
                        locals: json
                    }));
                } else {
                    fs.readFile(path, function(err, data) {
                        if (err)
                            self.status(500).end('Server Internal Error');
                        else {
                            cacheTime[file] = stat.mtime;
                            cache[file] = data;
                            self.end(swig.render(data, {
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
                self.status(500).end('Server Internal Error');
            else {
                fs.readFile(path, function(err, data) {
                    if (err)
                        self.status(500).end('Server Internal Error');
                    else {
                        cacheTime[file] = stat.mtime;
                        cache[file] = data;
                        self.end(swig.render(data, {
                            locals: json
                        }));
                    }
                });
            }
        });
    }
};

var sendFile = function(file) {
    var self = this,
        path = public + file;
    if (cacheTime[file]) {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error');
            else {
                if (stat.mtime == cacheTime[file]) {
                    self.end(cache[file]);
                } else {
                    fs.readFile(path, function(err, data) {
                        if (err)
                            self.status(500).end('Server Internal Error');
                        else {
                            cacheTime[file] = stat.mtime;
                            cache[file] = data;
                            self.end(data);
                        }
                    });
                }
            }
        });
    } else {
        fs.stat(path, function(err, stat) {
            if (err)
                self.status(500).end('Server Internal Error');
            else {
                fs.readFile(path, function(err, data) {
                    if (err)
                        self.status(500).end('Server Internal Error');
                    else {
                        cacheTime[file] = stat.mtime;
                        cache[file] = data;
                        self.end(data);
                    }
                });
            }
        });
    }
};


exports.render = render;
exports.sendFile = sendFile;
exports.public = public;