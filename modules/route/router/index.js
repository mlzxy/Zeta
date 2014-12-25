/*!
 * Zeta
 * Copyright(c) 2014-2015 Xinyu Zhang beviszhang1993@gmail.com
 * MIT Licensed
 * I borrow this one from @herenow, and do a little modification, will try to optimize it further in the future.
 * Anyway, thank you so much @herenow.
 */

//Router
delete require.cache[require.resolve(__dirname + '/lib/parser.js')];
delete require.cache[require.resolve(__dirname + '/lib/router.js')];

var Router = require('./lib/router.js');
//Entry point
module.exports = exports = Router;