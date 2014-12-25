var gulp = require('gulp');
var mocha = require('gulp-mocha');
var testSrcBase = [
    './test/base/*.js', './test/base/Module/test*.js'
];

var testSrcReqMethod_del = './test/requestMethods/delete.js';
var testSrcReqMethod_head = './test/requestMethods/head.js';
var testSrcReqMethod_post = './test/requestMethods/post.js';
var testSrcReqMethod_put = './test/requestMethods/put.js';
var testSrcReqMethod_get = './test/requestMethods/get.js';
var testSrcReqMethod_opt = './test/requestMethods/option.js';

gulp.task('testReqMethod_get', function() {
    return gulp.src(testSrcReqMethod_get, {
        read: false
    }).pipe(mocha());
});

gulp.task('testReqMethod_post', function() {
    return gulp.src(testSrcReqMethod_post, {
        read: false
    }).pipe(mocha());
});

gulp.task('testReqMethod_put', function() {
    return gulp.src(testSrcReqMethod_put, {
        read: false
    }).pipe(mocha());
});

gulp.task('testReqMethod_head', function() {
    return gulp.src(testSrcReqMethod_head, {
        read: false
    }).pipe(mocha());
});

gulp.task('testReqMethod_opt', function() {
    return gulp.src(testSrcReqMethod_opt, {
        read: false
    }).pipe(mocha());
});

gulp.task('testReqMethod_del', function() {
    return gulp.src(testSrcReqMethod_del, {
        read: false
    }).pipe(mocha());
});


gulp.task('testBase', function() {
    return gulp.src(testSrcBase, {
        read: false
    }).pipe(mocha());
});



gulp.task('test', [ // 'testBase',
    'testReqMethod_put',
    'testReqMethod_get', 'testReqMethod_opt', 'testReqMethod_del',
    'testReqMethod_head', 'testReqMethod_post'
]);