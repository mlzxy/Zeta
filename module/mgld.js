var route = require('../route/router.js');

var MOD_NAME = 'mgld';


var module = function(mName, mArray) {
    var m = {};
    m.name = mName;
    m.dependent = mArray;
    var depM = depModules(mArray);
    m = mergeMod(m, depM);
    m = route.routeFunPack(m);
    return m;
};


var provider = function(pName, service) {

};

var handler = function(hName, handle) {

};

var factory = function(fName, fac) {

};


/*merge two modules*/
var mergeMod = function(m1, m2) {
    // todo
    return m1;
};


/*get a single module based on the module name*/
var requireMod = function(mName) {
    // todo
};



/*return a single module object*/
var depModules = function(mArray) {
    var m = {};
    for (var i = 0; i < mArray.length; i++) {
        m = mergeMod(m, requireMod(mArray[i]));
    }
    return m;
};