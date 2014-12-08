var m = require('../../').module('demo-factory', ['demo-provider']);
var formidable = require('formidable');
var fakeuser = m.config('fakeuser');

var userFactory = function(user, msg) {
    this.getuser = function() {
        return user;
    };
    this.getmsg = function() {
        return msg;
    };
};

m.factory('userFactory', function($scope, $sayhi) { // you do not need to use $scope here
    return new userFactory(fakeuser, $sayhi());
});


m.factory('$form', function() {
    var form = new formidable.IncomingForm();
    return form;
});