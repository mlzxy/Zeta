var m = require('../../').module('demo-login', ['demo-factory']);
m.l();


m.handler('login', function($scope, $render) {
    $scope.res.end($render('/login.html'));
});


m.handler('loginForm', function($scope, $form, db, $cookie) {
    $form.parse($scope.req, function(err, fields, files) {
        db.set(fields.user);
        $cookie.val('user', fields.user).write($scope.res);
        $scope.res.end('login success!');
    });
});


m.post('/login', "loginForm");