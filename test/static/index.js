var m = require('../../').module('test-static', []),
    http = require('http');
m.config('root', __dirname);
m.config('public', __dirname + '/public');
m.l();
m.any("static");



http.createServer(m.s()).listen(8000);