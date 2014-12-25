var gulp = require('gulp');
var mocha = require('gulp-mocha');
var testSrc = [
    // './test/base/*.js', './test/base/Module/test*.js'
    // ,
    './test/requestMethods/*.js'
];
gulp.task('test', function() {
    return gulp.src(testSrc, {
        read: false
    }).pipe(mocha());
});