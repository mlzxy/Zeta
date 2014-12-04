//Dependencies
var Routes = require('./routes')

//Parse a route and put it into the routing table
function Parser(pathname, handler) {
    //Narrow it down with the method table
    var method = this.method
    var table = Routes[method]

    //Check if returning function was passed
    if(typeof handler !== 'function') {
        throw 'No handler function was passed'
    }

    //Remove the first and last slash frm the expression if present
    pathname = trimPathname(pathname)

    //Split the path into paths to start indexing
    var paths = splitPath(pathname)

    //Size, this will be used as an index later on
    var size = paths.length

    //Check if its a static route
    var params = pathname2ParamsArray(paths)

    //Its static, add to static routes and finish
    if(params.length === 0) {
        table.staticRoutes[pathname] = {
            handler: handler
        }

        table = table.staticRoutes[pathname] //recurse into
    }
    //Else, its a dynamic route, recurse into dynamicRoutes
    else {
        table = table.dynamicRoutes

        //Check if a routing table for the given size filter already exists, if not create
        if(typeof table[size] === 'undefined') {
            table[size] = {
                params: [],
                bases:  {},
            }
        }

        //Recurse into table filtered by size
        table = table[size]

        //Add route to dynamic table table
        for(var i = 0; i < size; i++) {
            var path = paths[i]
            var param_index = indexOfParam(i, params)

            //Its an parameter
            if(param_index > -1) {
                var param = params[ param_index ]

                var length = table.params.push({
                    param: param.name,
                })

                //Recurse into table created
                table = table.params[ length - 1 ]

                //Check if a regexp was passed
                if(typeof param.regexp !== 'undefined') {
                    table.regexp = new RegExp(param.regexp)
                }

                //Add routing scheme
                table.routes = {
                    params: [],
                    bases:  {}
                }

                //Check if this is the last iteration, if so, add the handler
                if(i >= size - 1) {
                    table = table.routes //recurse into
                    table.handler = handler
                }
                //Else recurse into next table we will be working in
                else {
                    table = table.routes
                }
            }
            //Its a base path
            else {
                //Create a new table, if not exists
                if(typeof table.bases[path] === 'undefined') {
                    table.bases[path] = {
                        params: [],
                        bases:  {},
                    }
                }

                //Recurse into routing table
                table = table.bases[path]

                //Check if this is the last iteration, if so, add the handler
                if(i >= size - 1) {
                    table.handler = handler
                }
            }
        }
    }

    //Pointer to final table
    //The final table contains all metadata of the route
    this.table = table

    return this
}


//Helper function to trim the pathnames first and last slash
//@return string (trimed pathname)
function trimPathname(pathname) {
    if(pathname.charAt(0) === '/') {
        pathname = pathname.substring(1)
    }

    if(pathname.charAt(pathname.length - 1) === '/') {
        pathname = pathname.substring(pathname.length)
    }

    return pathname
}

//Helper function to construct an array with parameters of a pathname
//@return [] (parameters found)
function pathname2ParamsArray(paths) {
    var params = []

    for(var p in paths) {
        var path = paths[p]

        if(path.charAt(0) === ':') {
            var push_data = {
                pos: parseInt(p)
            }

            //Remove `:` from path string
            path = path.substring(1)

            //Check if an regexp was passed
            if(path.indexOf('(') > -1 && path.lastIndexOf(')') > -1) {
                //Start, end
                var start = path.indexOf('(')
                var end   = path.lastIndexOf(')')

                //Extract regexp string from path
                var regexp = path.substring(start + 1, end)

                //Remove regexp from path identifier
                path = path.substring(0, start)

                push_data.regexp = regexp
            }

            //Append parameter identifier
            push_data.name = path

            params.push(push_data)
        }
    }

    return params;
}

//Helper function to retrieve parameters inside an given array of paths
//@return integer (index in the array)
function indexOfParam(pos, parameters) {
    for(var i in parameters) {
        if(parameters[i].pos == pos) {
            return i
        }
    }
    return -1
}

//Helper function to properly parse a url, this replaces require('url').parse(path).pathname
function urlParse(url) {
    var query = url.indexOf('?')

    if(query !== -1) {
        url = url.substring(0, query)
    }

    return url
}

//Helper function to split the path into smaller base paths
//A simple pathname.split('/') wont work, since regexp can contain slashes
//@input string
//@return array
function splitPath(path) {
    var paths  = []
    var buffer = ''
    var i      = 0

    //Modes
    var inParameter = false, inRegexp = false

    while(i < path.length) {
        //Check if a parameter is starting
        if(path[i - 1] == '/' && path[i] == ':') {
            inParameter = true
        }

        //Check if they passed a regexp
        //This initialize the regexp buffer
        if(inParameter === true && inRegexp === false && path[i] == '(') {
            inRegexp = true
        }
        //Deactivate
        else if(inRegexp === true && path[i] == ')' && path[i + 1] == '/') {
            inRegexp = false
        }

        //Clear buffer or append
        if(path[i] == '/' && inRegexp === false) {
            //Clear buffer
            paths.push(buffer)
            buffer = ''
            inParameter = false //default
        }
        else {
            buffer = buffer + path[i]
        }

        i++ //next character
    }

    //Push any remaining buffers
    if(buffer) {
        paths.push(buffer)
    }

    return paths
}

//Exports
Parser.trimPathname = trimPathname
Parser.url = urlParse
module.exports = Parser
