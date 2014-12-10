var m = require('../').module('demo', ['demo-login']),
    http = require('http');

m.config('root', __dirname);
m.config('public', __dirname + '/public');
m.config('dburl', 'http://meow.meow');
m.server();
/*==================================================*/
m.handler('loginCheck', function($scope, $cookie, db) {
    $scope.user = $cookie.get('user');
    db.get($scope.user, function(exist) {
        if (exist)
            $scope.go('next');
        else
            $scope.go('login');
    });
});
m.handler('welcome', function($scope, $render, $sayhi) {
    $scope.res.end($render('/index.html', {
        name: $scope.user,
        msg: $sayhi()
    }));
});



m.get('/', "login");
m.post('/login', "loginForm");
m.get('/user', ["loginCheck", "welcome"]);
http.createServer(m.go()).listen(3000);