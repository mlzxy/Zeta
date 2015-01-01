var Zeta = require('../../'),
    request = require('supertest'),
    demo = Zeta.module('demo', []),
    should = require('chai').should();
demo.config('public', __dirname);
demo.load();
describe('$render', function() {
    describe('$render.text', function() {
        it('should return the original string for normal string', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render.text('welcome'));
            });
            demo.get('/', 'h0');
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('welcome', done);
        });
        it('should render html successfully', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render.text('<p>welcome</p>'));
            });
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('<p>welcome</p>', done);
        });
        it('should support variable in html', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render.text('<p>{{log}}</p>', {
                    log: 'welcome'
                }));
            });
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('<p>welcome</p>', done);
        });
        it('should support swig string', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render.text(
                    '{% for item in seq -%}' + '\n' + '{{item}}' + '\n' + '{%- endfor %}', {
                        seq: ['1', '2']
                    }
                ));
            });
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('12', done);
        });
    });
    describe('render from file', function() {
        it('should find the specific file and get original string for normal file', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render('/index.txt'));
            });
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('welcome to Zeta\n', done);
        });
        it('should render html file successfully', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render('/index.html'));
            });
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('<body>\n    <p>welocme to Zeta</p>\n</body>\n', done);
        });
        it('should render swig file successfully', function(done) {
            demo.h('h0', function($scope, $render) {
                $scope.res.end($render('/index.swig', {
                    title: 'HOME'
                }));
            });
            request(demo.server(true)).
            get('/').
            expect(200).
            expect('\n<p>\n    HOME\n    Suemi,welcome to Zeta\n</p>\n', done);
        });
    });
});