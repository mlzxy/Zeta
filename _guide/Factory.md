---
layout: guide
title: Factory
date: 2015-01-19
---

#Factory

##Overview
To some extent,  Factory does the similar thing of Provider, but it distinguish them that Factory provides a new object every time a request arrives while Provider is shared between requests. What's more, Factory must be a function returning object instead of being an object itself. In some situations you can use both of them to complete your work, but there are indeed scenes in that using Factory will make things easy and beautiful.

##Get Started

###Define Factory
A Factory is also registered by a module. Example follows.

~~~js
demo.factory('$sayhi',function(){
    return {content:'hi,world'};
});
//demo is a module
~~~

Now you get a Factory named $sayhi  returning a new object which has a attribute 'content' whose value equals "hi,world". The letter ‘$’ is not necessary, but we recommend you to insert this before your Factory name in order to distinguish from common variables.

Factory can return anything you want, function included.

~~~js
demo.factory('$plus',function(){
    return function(a,b){
        return a+b;
    };
});
~~~

And you can use $scope in Factory adding it to the argument list, as for $scope, you will learn it in the later chapters.

~~~js
demo.factory('$increment',function($scope){
    return function(){
        return ++$scope.param.indexNumber;
    };
});
~~~

###Use Factory
As with Provider, Factory is designed to be used in request handler function, code follows.

~~~js
//$plus is defined in the example before
demo.get('/',function($scope,$plus){
    $scope.send($plus(1,2).toString()).end();
});
//the client will get '3'
~~~

The $plus we used in handler function is not the function we defined as a Factory, but what it returns. And please don't forget to add the Factory name to the argument list of the handler function.

###Get Factory

Just like the Provider, you can get the Factory already registered , otherwise undefined will come to you.

~~~js
var plus=demo.factory('$plus')();
console.log(plus(1,2));
//3 will be got
var dus=demo.factory('$wel');
dus==undefined//true
~~~


###A Simple Example
As with the Provider chapter, a little more complicated instance will be provided. Please ignore anything you cannot understand in the following code block.

~~~js
//main.js file
var zeta=require('zeta');
var demo=zeta.module('demo',['demoFactory']);
demo.load();
demo.get('/',function($scope,$plus){
   $scope.send($plus(1,2).toString());
});
~~~

~~~js
//Factory.js
var zeta=require('zeta');
var demoFactory=zeta.module('demoFactory',[]);
demoFactory.provider('$plus',function(){
    return function(a,b){return a+b;};
});
~~~

It's same with Provider that Factory can be inherited through the dependency injection between modules.

##Conquer Factory

###Factory Use Provider

There is no difficulty in using Provider in a Factory, just add the Provider name to the argument list of Factory like below.

~~~js
demo.provider('$wel',{
    a:1,
    b:2,
    c:3
});
demo.factory('$sum',function($wel){
    var sum=0;
    for(var i in $wel){sum+=$wel[i];}
    return sum;
});
~~~

###Factory Use Factory

Just similar to using Provider, also an example.

~~~js
demo.factory('$wel',function(){
    return {
        a:1,
        b:2
    };
});
demo.factory('$sum',function($wel){
    return function(){
        var tmp=$wel();
        return tmp.a+tmp.b;
    };
});
~~~

###Meaning Of Factory

As we already have Provider, you may ask why we should introduce Factory. First, let us look at two implementation of handling form upload through the plugin formidable.

~~~js
//Use Provider
var formidable=require('formidable');
demo.provider('$form',formidable);
demo.post('/upload',function($scope,$form){
    var tmp=new $form.IncomingForm();
    tmp.on('file',function(file){...});
});
~~~

~~~js
//Use Factory
var formidable=require('formidable');
demo.factory('$form',function(){
    return new formidable.IncomingForm();
});
demo.post('/upload',function($scope,$form){
    $form.on('file',function(file){...});
});
~~~

Through the example, now you already figure out the difference between Provider and Factory. The service '$form' doesn't prefer anyone of both. But think about another situation, the cookie. If we use an object to represent the cookie of the request, every time the 
cookie defers from each other, and it may not be proper to expose the parse process in handlers. With the help of Factory, a piece of cake!

~~~js
demo.factory('$cookie',function($scope){
    var cook={};
    cook._val=parse($scope.req.headers['cookie']);
    cook._option={};
    cook.getValue=function(name,optName){...};
    cook.setCookie=function(obj){..};
    ...
});
~~~

Not hard to find it may be more convenient to use Factory for the cookie service. In one word, for situations that every request needs a new object, we recommend you to use Factory.


##Attention
- Factory can be overwrite by redefine it.

~~~js
demo.factory('$compute',function(){
    return function(a,b){return a+b;};
});
demo.factory('$compute')()(1,2)==3//true
demo.factory('$compute',function(){
    return function(a,b){return b-a;};
});
demo.factory('$compute')()(1,2)==1//true
~~~

- Remember to add your Factory name to the argument list of request handler function.
- Remember Factory must be a function, and its argument list contains what it depends on. And what Factory returns not itself is your need.
- Handlers handling the same request share the same object Factory returns.

~~~
demo.factory('$count',function(){
    return {num:0};
});
demo.handler('h0',function($scope,$count){
    $count.num++;
    $scope.go('next');
});
demo.handler('h1',function($scope,$count){
    $scope.send($count.num.toString()).end();
});
demo.get('/',['h0','h1']);
//the client will get 1 instead of 0
~~~

- You will get a new object every time a new request arrives.

~~~js
demo.factory('$count',function(){
    return {num:0};
});
demo.get('/',function($scope,$count){
    $scope.send($count.num.toString());
    $count.num++;
    $scope.end();
});
//the client will get 0 every time requesting path '/'
~~~
