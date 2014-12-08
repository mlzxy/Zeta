var m = require('../../').module('demo-factory', ['demo-provider']);
var formidable = require('formidable');






m.factory('$form', function() {
    var form = new formidable.IncomingForm();
    return form;
});



var dburl = m.config('dburl'); //this one is fake
var getuser = function(uname, cb) {
    if (uname == "xinyu")
        cb(this.scope, true);
    else
        cb(this.scope, false);
};
m.factory('db', function($scope) {
    var l = {};
    l.scope = $scope;
    l.url = dburl;
    l.getuser = getuser;
    return l;
});