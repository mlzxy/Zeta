---
layout: guide
title: $scope
date: 2015-01-13
---


# Overview

`$scope` is the most important service.

- You must use `$scope` as the first argument in handler

~~~javascript
m.get('/', function($scope){
    $scope.end('hello world');
}
~~~

And `$scope` is shared across one handler chain in per request.

~~~javascript
m.get('/', [function($scope){
                 $scope.msg = 'hello world';
                 $scope.go('next');
            },
            function($scope){
                 $scope.end($scope.msg);
            }]);
~~~


- You could also use `$scope` as the first argument in factory. (But if used, must be the first argument.)

~~~javascript
m.factory('foo', function($scope){
    return mkStuff($scope);
})
~~~


# Getting Start

`$scope` contains **request & response information and a lot of other crucial utilities**.

## Utility

> $scope.constructor.prototype === http.ServerResponse.prototype

$scope is just a serverresponse with more useful attributes.

### $scope.sendFile

~~~javascript
var m = require('zeta').module('m1',[])
.config('public',__dirname + '/public')

.get('/', function($scope){
       $scope.sendFile('/index.html'); //Will send __dirname + /public/index.html
})
~~~

Zeta has cache for sending Files based on  **last modified time**, if mtime hasn't changed, then will read from cache, otherwise will read disk and update cache.


### $scope.render

~~~javascript
var m = require('zeta').module('m1',[])
.config('public',__dirname + '/public')

.get('/', function($scope){
       $scope.render('/index.html', json); //Will use json to render  __dirname + /public/index.html and send the rendered result.
})
~~~

> Notice here!

if `index.html` is

~~~html
{% extends 'other.html' %}
~~~

and the `other.html` changed, but the `mtime` of `index.html` do not, so render will still use the cache. So you have to change `index.html` to have the cache updated.



### $scope.send 

Really easy.

~~~javascript
$scope.send(string or jsonObject);
~~~

> Note that $scope.send won't end the response.


### $scope.json

~~~javascript
$scope.json(jsonObject);
~~~

> Note that $scope.json only accept json like Object, and will end the string.

### $scope.head

Just see its definition

~~~javascript
$scope.head =  function(name, val) {
               this.setHeader(name, val);
               return this;
              }
~~~

### $scope.status

~~~javascript
$scope.status = function(code) {
               this.statusCode = code;
               return this;
             }
~~~


### $scope.res & $scope.req

- `$scope.req` is the request object.
- `$scope.res === $scope` is the response object.


## $scope.go

`$scope.go` is how you jump between different handlers.

### $scope.go('hname')

`$scope.go` allows you to jump to any handler that been registered.

~~~javascript
var m = require('zeta').module('m1',[])
.handler('h1', function($scope){
     $scope.go('h1');
})
.handler('h2', function($scope){
     $scope.end('hello world');
})

.get('/', 'h1');
~~~

Then access `/` will return `hello world`.

### $scope.go('next')


$scope.go('next') will go to the next handler in the chain. 

~~~javascript
var m = require('zeta').module('m1',[])
.handler('h1', function($scope){
       $scope.go('h2');
})
.handler('h2', function($scope){
       $scope.go('next');
})

.get('/', [function($scope){
            $scope.go('h1');
         }, 
           function($scope){
            $scope.end('hello world');
         }]);
~~~


Then access `/` will return `hello world`.

> $scope.dchain is the handler chain, $scope.go('next') will pick the next handler in that array. So $scope could resume back to the chain even it goes nowhere.
