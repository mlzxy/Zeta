var m = require('../').module('demo', ['demo-login']),
    http = require('http');

m.config('root', __dirname);
m.config('public', __dirname + '/public');
m.config('fakeuser', 'Xinyu');
m.server();






m.handler('loginCheck', function($scope, $form, userFactory) {
    $form.parse($scope.req, function(err, fields, files) { //this one should be cookie, not form parse
        if (fields.user == userFactory.getuser()) {
            $scope.go('next');
        } else {
            $scope.go('login');
        }
    });
});


m.handler('welcome', function($scope, $render, userFactory) {
    $scope.res.end($render('/index.html', {
        name: userFactory.getuser(),
        msg: userFactory.getmsg()
    }));
});



m.get('/', "login");
m.post('/login', "loginForm");
m.get('/personal', ["loginCheck", "welcome"]);







http.createServer(m.go()).listen(3000);