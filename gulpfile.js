var gulp = require('gulp');
var mocha = require('gulp-mocha');
var testsrc = [
    './test/base/testModule.js',
    './test/base/testCircularModule.js',
    './test/base/testNpmModule.js',
    './test/req.methods/*.js',
    './test/routing/*.js',
    './test/config/*.js',
    './test/service.built.in/*.js',
    './test/error.handle/async.error.js',
    './test/error.handle/guard.with.syntax.js',
    './test/error.handle/sync.error.js',
    './test/service.built.in/static-server/static.js',
    './test/service/*.js'
];



gulp.task('test', function() {
    gulp.src(testsrc).
    pipe(mocha());
});