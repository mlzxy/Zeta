var m = require('../../../').module('test-static', []),
    http = require('http');
m.config('root', __dirname);
m.config('public', __dirname + '/public');

m.config.of('built-in').of('static-server').val('indexFile', ['.html', '.htm']);

m.l();
m.any("static");

m.app();