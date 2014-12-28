var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');


var testSrc = [
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

var zetaSrc = [
    './base/*.js',
    './modules/**/*.js',
    './modules/**/**/*.js',
    './modules/**/**/**/*.js'
];



gulp.task('test', function() {
    gulp.src(testSrc).
    pipe(mocha());
});


gulp.task('cov', function(cb) {
    gulp.src(zetaSrc)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(testSrc)
                .pipe(mocha())
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', cb);
        });
});