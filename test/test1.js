var gld = require('../module/mgld.js');
var md = gld.module('m1', []);

md.config("test", true);


md.provider("$hello", function() {
    console.log("hello!");
});

md.factory("world", function($hello) {
    $hello();
    return "world";
});

md.post("/", function(req, res) {
    //do stuff;
});



exports = md;