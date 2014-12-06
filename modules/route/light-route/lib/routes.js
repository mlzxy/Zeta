//Methods
var Methods = ['GET', 'POST', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE', 'CONNECT']

//Routing hashtable
var Table = {}

//Build the table
for(var i in Methods) {
    Table[ Methods[i] ] = {
        staticRoutes: {},
        dynamicRoutes: {},
    }
}

//Export it
module.exports = Table
