---
layout: guide
title: Factory
date: 2015-01-19
---

# Factory

# Overview



Factory must be a function return an value, providing a new variable every time a request arrives while Provider is shared between requests. 


~~~js
m.factory('$hello',function(){
    return "hello world";
})
.get('/', function($scope, $hello){
    $scope.end($hello);  // $hello == 'hello world'
});
~~~



# Getting Start

## Use

### Set

Register factory into a module.


~~~javascript
m.factory('$sayhi',function(){
    return {content:'hi,world'};
});
~~~

Now you get a Factory named `$sayhi`.



### Dependency Injection

The Factory function support dependency injection for its arguments.

> You could use other providers & factories in the arguments.


~~~js
m.factory('$cookie',function($scope, $parse){
       return mkcookie($parse($scope.req));
});
~~~

> **$scope** is a special factory that discussed later, and if used, it must be the first argument.


### Get 

Just like the Provider, you can get the Factory already registered , otherwise `undefined` will come to you.

~~~js
var $cookie= m.factory('$cookie');
/*
$cookie == function($scope, $parse){
       return mkcookie($parse($scope.req));
}*/
~~~


## A Simple Example


~~~js
//main.js file
var m1 = require('zeta').module('m1',['f1']);
.load()
.get('/',function($scope, $db, $cookie){ 
 $db.findById($cookie.val('user'), function(result, err){
    if (err)
      $scope.status(500).end('Internal Error');
    else
      $scope.end(result);
 }); 
});
~~~

~~~js
//Factory.js
var f = require('zeta').module('f1',[]),
    mg = require('mongoose'');

f.provider('$db', mg)
.factory('$cookie', function($scope){  //only for **example**, $cookie is already built-in.
      //stuff
      return cookie;
  }
});
~~~


- It's same with Provider that Factory can be inherited from dependent modules.
- **$cookie** is a built-in factory.









