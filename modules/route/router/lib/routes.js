//Methods
var Methods = ['GET', 'POST', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE', 'CONNECT'];

//Routing hashtable
var Table = {};

//Build the table
for (var i = 0; i < Methods.length; i++) {
    Table[Methods[i]] = {
        staticRoutes: {},
        dynamicRoutes: {}
    };
}

//Export it
module.exports = Table;