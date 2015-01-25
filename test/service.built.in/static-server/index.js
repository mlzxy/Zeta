var m = require('../../../').module('test-static', []),
    http = require('http');
m.config('root', __dirname);
m.config('public', __dirname + '/public');


var process = {};
process['.md'] = function(x) {
    return 'markdown renderor';
};

m.config.of('built-in').of('static-server')
    .val('indexFile', ['.html', '.htm', '.md'])
    .val('processFun', process);


m.l();
m.any("static");

m.app();