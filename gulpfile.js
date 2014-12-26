var gulp = require('gulp');
var mocha = require('gulp-mocha');
var testsrc = ['./test/base/*.js', './test/base/Module/testModule.js'];


// gulp.task('test', [ // 'testBase',
//     'testReqMethod_put',
//     'testReqMethod_get', 'testReqMethod_opt', 'testReqMethod_del',
//     'testReqMethod_head', 'testReqMethod_post'
// ]);


gulp.task('req.method.test',function(){
    gulp.src('./test/requestMethods/*.js').
        pipe(mocha());
});
