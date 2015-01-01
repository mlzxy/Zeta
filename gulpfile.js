var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');


var testBase = ['./test/base/testModule.js',
    './test/base/testCircularModule.js',
    './test/base/testNpmModule.js'
];

var testReqMethod = ['./test/req.methods/*.js'];

var testRouting = ['./test/routing/*.js'];

var testConfig = ['./test/config/*.js'];

var testService = [
    './test/service/*.js',
];

var testService_Built_in = ['./test/service.built.in/*.js',
    './test/service.built.in/static-server/static.js', './test/service.built.in/$scope/index.js'
];


var testErrHandle = ['./test/error.handle/async.error.js',
    './test/error.handle/guard.with.syntax.js',
    './test/error.handle/sync.error.js'
];

/*==============================================================================*/

var testSrc = testBase.concat(testReqMethod, testRouting, testConfig, testService, testErrHandle, testService_Built_in);

var zetaSrc = [
    './base/*.js',
    './modules/**/*.js',
    './modules/**/**/*.js',
    './modules/**/**/**/*.js'
];

gulp.task('test-base', function() {
    gulp.src(testBase).
    pipe(mocha());
});

gulp.task('test-req-method', function() {
    gulp.src(testReqMethod).
    pipe(mocha());
});

gulp.task('test-routing', function() {
    gulp.src(testReqMethod).
    pipe(mocha());
});

gulp.task('test-config', function() {
    gulp.src(testConfig).
    pipe(mocha());
});

gulp.task('test-service', function() {
    gulp.src(testService).
    pipe(mocha());
});

gulp.task('test-service-built-in', function() {
    gulp.src(testService_Built_in).
    pipe(mocha());
});


gulp.task('test-errhandle', function() {
    gulp.src(testErrHandle).
    pipe(mocha());
});


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