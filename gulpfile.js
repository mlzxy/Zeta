var gulp = require('gulp');
var mocha = require('gulp-mocha');
var testsrc = [
    './test/base/testModule.js',
    './test/base/testCircularModule.js',
    './test/base/testNpmModule.js',
    './test/req.methods/*.js',
    './test/routing/*.js',
    './test/config/*.js'
];



gulp.task('test', function() {
    gulp.src(testsrc).
    pipe(mocha());
});