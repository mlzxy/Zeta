

# Introduction

![npm version](https://badge.fury.io/js/zeta.svg)
![](https://travis-ci.org/BenBBear/Zeta.svg)
![](https://coveralls.io/repos/BenBBear/Zeta/badge.png)

![logo](https://raw.githubusercontent.com/BenBBear/Zeta/dev/logo.png) 


```javascript
var m = require('zeta').module('test',[])

.load()
.get('/', function ($scope) {
  $scope.end('Hello World');
})
.app(8000);
```

<br><br><br>

## Installation

```shell
npm install zeta
```

<br><br><br>

## Features


### Speed
- Fast, See our [benchmark with express](https://github.com/BenBBear/Zeta-benchmark).

<br> 
### Module
- Angular-like Module Mechanism.


![](http://zetajs.io/img/module.png)

<br> 

### Service

- Angular-like Factory & Provider
- Dependency Injection for Factory & Handler

```javascript
app
.provider('foo',{})
.factory('bar',function(foo){
   return foo; 
})
.get('/', function($scope, foo, bar){
})
```
<br> 

### Middleware



- **More Flexible Approach** to handle "Middleware"

```javascript
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
```

- **Handlers Collaboration**: Component Injection for $scope

```javascript
app
.h('h1', function($scope){
    $scope
       .provide('localInfo', 'hello world')  //then 'localInfo' will be available for injection in the following handlers
       .go('next');
})

.h('h2', function($scope, localInfo){
    $scope.end(localinfo)  // => hello world
})

.get('/', ['h1', 'h2']);
```

<br> 

### Error Handle


- **Built-in Error Handle Support** use [Domain](http://nodejs.org/api/domain.html): 

```javascript
app
.guard.get().post('/') 
.with(function($scope){
 $scope.end('404 not found'); 
});
```
<br> 

### More

- **Use Node Default Http Module**: No Worries about Library Support like [socket.io](http://socket.io)
- **Built-in Factory & Handler**: Ready To Use & Easy to Add 


<br><br><br>

## Quick Start

1. Our [Guide](http://zetajs.io/guide/1.Introduction.html) is a nice place to get start.
2. You could bootstrap your code from [zeta-seed](https://github.com/cloud-bear/zeta-seed).

<br><br><br>

## Tests

To run the test suite, first clone the code, install the dependancies, then run `npm test`:

```shell
$ git clone https://github.com/BenBBear/Zeta dir && cd dir
$ npm install
$ npm test
```

<br><br><br>

## Contributors



- [BenBBear](https://github.com/BenBBear/)
- [suemi994](https://github.com/suemi994/)



## License

MIT
