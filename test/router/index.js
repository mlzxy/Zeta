var router = require('light-router');

function respond(req, res) {
    res.end('benchmark');
};
router.get('/v1', respond);
router.get('/v1/hello', respond);
router.get('/v1/user/:id', respond);
router.get('/v1/user/status/:id', respond);
router.get('/v1/register/status/:id([0-9])', respond);
router.get('/v1/emails/:provider', respond);
router.get('/v1/time/:gmt(^\\+[0-9]{1,2}$)', respond);

require('http').createServer(router).listen(2048);