var gld = require('../module/mgld.js');
var md = gld.module('m2', []);


md.factory("world", function($hello) {
    $hello();
    return "world";
});

md.post("/", function(req, res) {
    //do stuff;
});



exports = md;