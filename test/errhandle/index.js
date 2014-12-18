var m = require('../../').module('test-static', []),
    http = require('http'),
    emt = require('events').EventEmitter;
m.config('root', __dirname);
m.load();




m.get('/', function($scope) {
    var ee = new emt();
    ee.on('error', function() {
        throw new Error();
    });
    ee.emit('error');
});

var fe = function($scope) {
    $scope.res.end('404 not found');
};

m.guard.get('/').with(fe);


m.app();