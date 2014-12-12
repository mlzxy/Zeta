/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 */

//Route parser
var Parser = require('./parser');

//Route table
var Routes = require('./routes');

//Return a 404 http code
var notFound = function defaultNotFound(req, res) {
    res.statusCode = 404;
    res.end('404 - Not found');
};

//Route finder, if nothing is matched nothing is done
//@return void
function Router(req, res) {
    //Select the a routing table based on the request method
    var table = Routes[req.method];

    //Parse the url
    var path = Parser.url(req.url);

    //Remove the first and last slash frm the path if present
    path = Parser.trimPathname(path);

    //Try to match one of the static routes first, only then fallback to the dynamic routes
    var static_match = table.staticRoutes[path];

    if (typeof static_match !== 'undefined') {
        var handler = static_match.handler;
        handler(req, res);
        return;
    }
    //Explode the path into smallers paths
    var paths = path.split('/');

    //Number of paths in the url
    var size = paths.length;

    //Recurse into dynamicRoutes table
    table = table.dynamicRoutes[size];

    //Check if there are any dynamic routes this size, if not, dont even bother
    if (typeof table === 'undefined') {
        return notFound(req, res);
    }

    //Clear the request parameters holder
    req.params = {};

    //Start iterating throught the routing tree
    continue_to_next_value:
        for (var i = 0; i < size; i++) {
            //Vars
            var value = paths[i]; //The part of the path we are currently working with

            //First try matching with the hashtable with base paths
            var base = table.bases[value];

            //Check if some base path was matched
            if (typeof base !== 'undefined') {
                table = base; //recurse into
                continue; //to next match
            }
            //Else, check the parameters table
            else if (table.params.length > 0) {
                var params = table.params;

                for (var p = 0; p < params.length; p++) {
                    var key = params[p].param;
                    var rule = params[p].regexp;

                    if (typeof rule !== 'undefined') {
                        if (rule.test(value) === false) {
                            continue; //Try matching next parameter, if exists
                        }
                    }

                    //If we got here, we found a possible parameter :)
                    req.params[key] = value;
                    table = params[p].routes; //recurse into
                    continue continue_to_next_value; //Break to next part of the paths
                }
            }

            return notFound(req, res);
        }

    //If we are here, the dynamicRoutes algorithm must have found a route
    //But just in case my algorithm has a logic error, i'll add the default notFound :)
    var routeHandler = table.handler || notFound;

    routeHandler(req, res);
}

Router.table = Routes;

//Router methods
Router.get = Parser.bind({
    method: "GET"
});
Router.post = Parser.bind({
    method: "POST"
});
Router.put = Parser.bind({
    method: "PUT"
});
Router.head = Parser.bind({
    method: "HEAD"
});
Router.delete = Parser.bind({
    method: "DELETE"
});
Router.options = Parser.bind({
    method: "OPTIONS"
});
Router.trace = Parser.bind({
    method: "TRACE"
});
Router.connect = Parser.bind({
    method: "CONNECT"
});

//Return the routing table
Router.routingTable = function RoutingTable() {
    return Routes;
};

//Overide custom 404 not found
Router.any = function overideDefaultNotFound(fnc) {
    notFound = fnc;
};

//Exports
module.exports = Router;