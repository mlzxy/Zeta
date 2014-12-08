var m = require('../').module('demo-login', ['demo-db']);

var loginhtml = "";

m.handler('login', function($scope) {
    $scope.res.end(loginhtml);
});


m.handler('loginForm', function($scope, $form, db, $cookie) {
    $form.parse($scope.req, function(err, fields, files) { //if you define this function outside, may archive better performance
        db.put(fields.user);
        //set cookie

        $scope.res.end('login success!');
    });
});