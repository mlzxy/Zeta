---
layout: guide
title: Provider 
date: 2015-01-16
---
# Provider

# Overview

You register `provider` to module, then it will be available to handlers & factories through dependency injection.

~~~javascript
m.provider('$hello', "hello");
m.get('/', function($scope, $hello){
             $scope.end($hello);
})

~~~



# Getting  Start

## Use


### Set

Register provider into a module.

~~~js
m.provider('$sayhi',function(){
          return "hi";
});
~~~
Now, you get a provide `$sayhi`. The letter '$' is not necessary.




### Dependency Injection


~~~javascript
m.get('/',function($scope,$sayhi){
    $scope.send($sayhi()).end();
});
~~~

Put its name into the arguments if you want to use it.

### Get 

If you have already define a Provider, it can be got like below.

~~~js
var p = m.provider('$sayhi');
// p  === $sayhi
~~~

## A Simple Example


~~~js
//main.js file
var m = require('zeta').module('m1',['p1'])

.load();
.get('/',function($scope,$home){
    $scope.render($home(),{
        title:'Home'
    });
});
~~~

~~~js
//Provider.js
var p = require('zeta').module('p1',[])
.provider('$home',function(){
    return '/public/home.html';
});
~~~

When you `load()`, you get providers from you dependent modules.



> It's nice to have the database instance or logging instance as provider.

