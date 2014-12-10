var m = require('../../').module('demo-provider', []);

var cache = {};
var db = {};
db.get = function(x, callback) {
    callback(cache[x]);
};

db.connection = m.config('dburl');

m.set = function(x) {
    cache[x] = true;
};
m.provider('db', db);





m.provider('$sayhi', function() {
    return "Hello,";
});