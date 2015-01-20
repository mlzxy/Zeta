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

.load()
.get('/', function ($scope) {
  $scope.end('Hello World');
})
.app(8000);
~~~

## Installation

~~~shell
npm install zeta
~~~


## Features


### Speed
- Fast, See our [benchmark with express](https://github.com/BenBBear/Zeta-benchmark).

### Module
- Angular-like Module Mechanism.


![]({{site.baseurl}}/img/module.png)



### Service

- Angular-like Factory & Provider
- Dependency Injection for Factory & Handler

~~~javascript
app
.provider('foo',{})
.factory('bar',function(foo){
   return foo; 
})
.get('/', function($scope, foo, bar){
})
~~~


### Middleware



- **More Flexible Approach** to handle "Middleware"

~~~javascript
app
.handler('login', function($scope){//stuff
})
.handler('checkLogin', function($scope,$cookie,db){
     db.check($cookie.val('user'), function(ok){
          if (ok){
             $scope.go('next'); 
           }else{
             $scope.go('login');
         }         
     });
})
.get('/home', ['checkLogin', function($scope){
       $scope.end('welcome');
}]);
~~~


### Error Handle


- **Built-in Error Handle Support** use [Domain](nodejs.org/api/domain.html): 

~~~javascript
app
.guard.get().post('/') 
.with(function($scope){
 $scope.end('404 not found'); 
});
~~~


### More

- **Use Node Default Http Module**: No Worries about Library Support like [socket.io](socket.io)
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
