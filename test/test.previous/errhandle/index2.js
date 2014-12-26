var m = require('../../').module('test-static', []),
    http = require('http'),
    domain = require('domain');
m.config('root', __dirname);
m.load();



var er = function() {
    throw new Error(123);
}


m.get('/', function($scope) {
    var d = domain.create();
    debugger;
    d.on('error', function() {
        console.log('how about that.');
        $scope.res.end('how about that');
    });
    d.run(er);
    // $scope.res.end('123');
});




m.app();