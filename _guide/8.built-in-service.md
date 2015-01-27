---
layout: guide
title: Built-in Service
---

# Built-in Service

## Overview

Here are some built-in useful services.

## render

The service renders file & string using [swig engine](paularmstrong.github.io/swig/).


### Render A String

> Note that **$render** is obsolete, please don't use it! Use **$scope.render** instead.

~~~js
m.get('/',function($scope,$render){
    $scope.end($render.text('<p>{{msg}}</p>'),{
        msg:"hello,world"
    });
});
~~~

### Render A File

~~~js
m.get('/',function($scope){
    $scope.render('/index.swig',{
        title:'Welcome'
    })
});
~~~

## Cookie

The cookie service has been mentioned in chapter Factory.

### Get Cookie

~~~js
var user=$cookie.val('user');
//return a cookie named user
~~~

### Set Cookie

~~~js
//reset the value of cookie
$cookie.val('user',Json.stringfy({name:'bevis'}));
//initialize the cookie
$cookie.val('user','bevis',{
    path:'/',
    maxAge:1000
});
//set value of cookie & cookie 
$cookie.val('user','bevis','maxAge',10000);

//write the cookie to client
$cookie.write($scope);

//a complete example
m.get('/',function($scope,$cookie){
    $cookie.val('user','bevis',{
        path:'/user',
        maxAge:10000
    });
    $cookie.write($scope);
    $scope.send('').end();
});
~~~

## Form

The factory `$form` returns a `IncomingForm` object of [formidable](https://github.com/felixge/node-formidable), you can refer to formidable's documents.

~~~js
m.post('/',function($scope,$form){
    .....
});
//$form is a IncomingForm object of formidable
~~~

## Static Server


> Note that this static server is just for development, it goes into disk evey time, nginx in production is a good choice.

### Use

~~~js
m.config('public',__dirname+'/public');
m.load();
m.any('static');
~~~

For instance,  ./public/img/avatar.jpg will be transferred to client side when request for path '/img/avatar.jpg' arrives.

### Render files

For example, set render function for ".md" files.

~~~javascript
m.config.of('built-in')
        .of('static-server')
        .val('processFun',{'.md': 
                              function(x){
                                 return rendered x;
                                 }});
~~~

Then `.md` file will get rendered and then be sent to client.


### index.* 

~~~js
m.config.of('built-in').of('static-server').val('indexFile',['.html','.md']);
~~~

Then when you access `/`, it will return `index.html` or `index.md`. The priority  follows the order of `indexFile`. For our example, the `index.html` is preferred compared with `index.md`.
