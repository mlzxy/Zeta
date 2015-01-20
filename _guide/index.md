---
layout: guide
title: Introduction
date: 2015-01-13
---

# Introduction

![npm version](https://badge.fury.io/js/zeta.svg)
![](https://travis-ci.org/BenBBear/Zeta.svg)
![](https://coveralls.io/repos/BenBBear/Zeta/badge.png)

~~~javescript
var m = require('zeta').module('test',[])
m.config('root',__dirname)

.load()
.get('/', function ($scope) {
  $scope.send('Hello World').end();
})
.app(8000);
~~~

## Installation

~~~shell
npm install zeta
~~~


## Features

- Fast, see our [benchmark with express](https://github.com/BenBBear/Zeta-benchmark).
- Angular-like module mechanism.
    - could handle circular dependency
    - use config to customize dependent modules before `app.load()` to load them.
    - config support namespace for easier to use.

![]({{site.baseurl}}/img/module.png)

- Angular-like Factory & Provider
- Dependency Injection for Factory & Handler

~~~javascript
app
.provider('foo',{})
.factory('bar',function(foo){
   //do stuff;
   return morefoo; 
})
.get('/', function($scope, foo, bar){
     // stuff
})
~~~

- **More Flexible Approach** to handle "Middleware"

~~~javascript
app
.handler('login', function($scope){
   // stuff
})
.handler('checkLogin', function($scope,$cookie,db){
     db.check($cookie.val('user'), function(ok){
          if (ok){
             $scope.go('next');  //resume on the array
           }else{
             $scope.go('login');
         }         
     });
})
.get('/home', ['checkLogin', function($scope){
       $scope.end('welcome');
}]);
~~~

- **Built-in Error Handle Support** use [Domain](nodejs.org/api/domain.html): 

~~~javascript
app.config('guard',true)
.guard.get().post('/')  //protect all get paths, and '/' post path with the following function
.with(function($scope){
 //$scope.error is the error Object
 //deal with error
 $scope.end('404 not found');
});
~~~

(note that domain method is not perfect, but seems no ideal choice around. See more in our [Error Handle Section](http://zetajs.io/guide/ErrorHandle.html).)

- Use Node Default Http Module: No Worries about Library Support like [socket.io](socket.io)
- **Built-in Factory & Handler**: Ready To Use & Easy to Add 

## Quick Start

1. Our [Guide](http://zetajs.io/guide) is the best place to get start.
2. You could bootstrap your code from [angular-zeta-seed](https://github.com/cloud-bear/angular-zeta-seed).


## Tests

To run the test suite, first clone the code, install the dependancies, then run `npm test`:

~~~shell
$ git clone https://github.com/BenBBear/Zeta dir && cd dir
$ npm install
$ npm test
~~~

## License

MIT
