var m = require('../').module('demo', ['demo-login']),
    http = require('http');

m.config('root', __dirname);
m.config('public', __dirname + '/public');
m.config('dburl', 'http://meow.meow');

m.server();







var usercheck = function($scope, exist) {
    if (exist)
        $scope.go('next');
    else
        $scope.go('login');
};

m.handler('loginCheck', function($scope, $cookie, db) {
    db.getuser($cookie.get('user'), usercheck);
});


m.handler('welcome', function($scope, $render, $sayhi, $cookie) {
    $scope.res.end($render('/index.html', {
        name: $cookie.get('user'),
        msg: $sayhi()
    }));
});



m.get('/', "login");
m.post('/login', "loginForm");
m.get('/user', ["loginCheck", "welcome"]);







http.createServer(m.go()).listen(3000);