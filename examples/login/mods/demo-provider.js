var m = require('../../../').module('demo-provider', []);
m.l();
var cache = {};
var db = {};
db.get = function(x, callback) {
    callback = callback.bind(undefined, cache[x]);
    process.nextTick(callback);
};

db.connection = m.config('dburl');

db.set = function(x) {
    cache[x] = true;
};
m.provider('db', db);





m.provider('$sayhi', function() {
    return "Hello,";
});
