var m = require('../../').module('demo', ['demo-login']),
    http = require('http');
m.config('serviceCache', true);
m.config('root', __dirname);
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
});
m.handler('welcome', function($scope, $render, $cookie, $sayhi) {
    $scope.res.end($render('/index.html', {
        name: $cookie.val('user'),
        msg: $sayhi()
    }));
});





m.get('/', "login");
m.get('/user', ["loginCheck", "welcome"]);




http.createServer(m.s()).listen(8000);