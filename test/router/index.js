var r = require('../../modules/route/router/index.js');


r.get("/hello/:id", function(req, res) {
    res.end(JSON.stringify(req.params));
});


require('http').createServer(r).listen(8000);