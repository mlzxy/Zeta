var m = require('../').module('demo-login', ['demo-db']);

var loginhtml = "";

m.handler('login', function($scope) {
    $scope.res.end(loginhtml);
});


m.handler('loginForm', function($scope, $form, userFactory) {
    $form.parse($scope.req, function(err, fields, files) { //if you define this function outside, may archive better performance
        if (fields.user == userFactory.getuser())
            $scope.go('welcome');
        else
            $scope.res.end('wrong username');
    });
});