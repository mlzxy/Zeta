---
layout: guide
title: Provider 
date: 2015-01-16
---
#Provider

##Overview

As its name, Provider provides service to do the same part of work when handling different requests in different situations. A Provider is an object essentially, it contains attributes and methods and belongs to a module. Providers can be inherited through the dependency injection of modules.  It's a logical concept.

##Get  Started

###Define Provider
A Provider can be registered by a module as below.

~~~js
demoProvider.provider('$sayhi',{
    content:"hi,world",
    say:function(){ return this.content;}
});
//demoProvider is a module
~~~
Now, you get a Provider named $sayhi. The letter '$' is not necessary, but we recommend you to insert this before your Provider name in order to distinguish from common variables.

Provider can be anything you want it to be, including function of course.

~~~js
demoProvider.provider('$plus',function(a,b){
    return a+b;
});
~~~

###Use Provider
The meaning of Provider is to extract the operation carried out when handling similar requests in one class. So Provider should be used in request handlers. Here is an instance.

~~~js
demo.provider('$sayhi',{
    content:"hi,world",
});
demo.get('/',function($scope,$sayhi){
    $scope.send($sayhi.content).end();
});
~~~

We just use Provider $sayhi to send string "hi,world" to client when a request for path '/' arrives.  It should be noticed that your Provider name must be added to the argument list of request-handler function, don't forget it.

###Get Provider

If you have already define a Provider, it can be got like below.

~~~js
var pro=demo.provider('$sayhi');
console.log(pro.content);
//get 'hi,world' when $sayhi defined
//else undefined got
~~~

###Advantage Of Provider
Then a question comes, why we use Provider instead of sending the string itself ? Try to imagine such scenes:

~~~js
demo.get('/abc',function($scope,$sayhi){
    $scope.send($sayhi.content+'abc').end();
});
demo.get('/efg',function($scope,$sayhi){
    $scope.send($sayhi.content+'efg').end();
});
....
~~~

There are lots of paths doing similar things, now you want to replace 'hi' with 'hello'. With Provider, you only need to do a little to modify your code.

~~~js
demo.provider('$sayhi',{
    content:"hello,world",
});
~~~

But without it, who knows? More will be described to help you use Provider in proper situations next.

###A Simple Example
We give a more complicated example for you to comprehend Provider globally, just ignore the part that you cannot understand now.

~~~js
//main.js file
var zeta=require('zeta');
var demo=zeta.module('demo',['demoProvider']);
demo.load();
demo.get('/',function($scope,$home){
    $scope.render($home(),{
        title:'Home'
    });
});
~~~

~~~js
//Provider.js
var zeta=require('zeta');
var demoProvider=zeta.module('demoProvider',[]);
demoProvider.provider('$home',function(){
    return '/public/home.html';
});
~~~

As you have seen, Provider can be inherited through the dependency injection process of modules. Don't leave the load process.

##Conquer Provider

###Provider Use Provider
It's easy for you to use another Provider when to define the current one.

~~~js
demo.provider('$hi',{
    content:'hi,world'
});
demo.provider('$say',function($hi){
    return $hi.content;
});
~~~

###Provider Use Factory
You can read the next chapter first before learning this part.

~~~js
demo.factory('$count',function(){
      return function(a,b){return a+b;};
});
demo.provider('$wel',function($count){
      return $count(1,2);
});
~~~

Very simple and similar to using provider, right?

###When To Use Provider
We create Provider to implement code reuse, so it should be supposed to do low-level and common work. For instance, wrapper the operation connected with database like this.

~~~js
var $db={};
$db.url='http://localhost;5000';
$db.connect=function(){...};
$db.save=function(obj){...};
$db.del=function(obj){...};
$db.find=function(obj){...};
demo.provider('$db',$db);
~~~

This is a design which makes sense. But kinds of unique work done in handling just several requests may not be proper to write as a Provider. Another positive example is to write a Provider to render html files. What's more, for situations that every request needs a new object, we recommend you to use Factory instead of Provider.

##Attention

- You can overwrite the previous Provider by defining one with the same name once more.

~~~js
demo.provider('$say',{content:'hi'});
console.log(demo.provider('$say').content);
//hi
demo.provider('$say',{content:'hello'});
console.log(demo.provider('$say').content);
//hello
~~~

- Remember to add your Provider name to the argument list of request handler function.
- Provider is shared between differnt handlers whether they belong to the same request or not. So be cautious to change Provider in handlers. The follow examples can help you figure this out, and we recommend you to read chapter Routing before scanning it.

~~~js
demo.provider('$count',{num:0});
demo.get('/count',function($scope,$count){
    $count.num++;
    $scope.send($count.num.toString()).end();
});
//you will get 1,2,3,4.. with client request '/count'
~~~

~~~js
demo.provider('$count',{num:0});
demo.handler('h0',function($scope,$count){
    $count.num++;
    $scope.go('next');
});
demo.handler('h1',function($scope,$count){
    $scope.send($count.num.toString()).end();
});
//you will get 1 instead of 0 when request '/count' for first time
~~~





