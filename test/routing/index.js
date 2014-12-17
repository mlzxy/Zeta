var m = require('../../').module('demo', ['demo-login']),
    http = require('http');

m.c('root', __dirname);
m.config('public', __dirname + '/public');
m.config('dburl', 'http://localhost:dbport?paremeters');
m.l();


m.handler('loginCheck', function($scope, $cookie, db) {
    $scope.user = $cookie.val('user');
    db.get($scope.user, function(exist) {
        if (exist)
            $scope.go('next');
        else
            $scope.go('login');
    });
}).h('welcome', function($scope, $render, $sayhi) {
    $scope.res.end($render('/index.html', {
        name: $scope.user,
        msg: $sayhi()
    }));
});






m.get('/', "login").get('/user', ["loginCheck", "welcome"]);


// m.app();

module.exports = exports = m.server();