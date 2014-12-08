var m = require('../../').module('demo-provider', []);

m.provider('$sayhi', function() {
    return "Hello :)";
});