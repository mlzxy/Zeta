---
layout: guide
title: Built-in Service
date: 2015-01-22
---

# Builtin Service

## Overview
Zeta.js has provided several kinds of service in common use in order to make it convenient for users to write the server-side code for web application. In the parts followed, we will introduce them in brief  for you separately.

## $render

The service renders file & string using swig engine.

> Note that $render is obsolete, please don't use it! Use $scope.render instead.

### Render A String
You need to use the provider $render explicitly to render a string even there are variables in it.

~~~js
demo.get('/',function($scope,$render){
    $scope.end($render.text('<p>{{msg}}</p>'),{
        msg:"hello,world"
    });
});
//demo is a module
~~~

### Render A File
We have exposed an ease api for you to render html or swig file.

~~~js
demo.get('/',function($scope){
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
demo.get('/',function($scope,$cookie){
    $cookie.val('user','bevis',{
        path:'/user',
        maxAge:10000
    });
    $cookie.write($scope);
    $scope.send('').end();
});
~~~

## Form

The factory `$form` returns a IncomingForm object of formidable, for the next operation, you can refer to formidable's documents.

~~~js
demo.post('/',function($scope,$form){
    .....
});
//$form is a IncomingForm object of formidable
~~~

## Static Server


> Note that this static server is just for development, it goes into disk evey time, nginx in production is a good choice.

### Use

~~~js
demo.config('public',__dirname+'/public');
demo.load();
demo.any('static');
~~~

For instance,  ./public/img/avatar.jpg will be transferred to client side when request for path '/img/avatar.jpg' arrives.

### Render files

~~~javascript
demo.config.of('built-in').of('static-server').val('indexFile',{'.md': function(x){
                                                                          return rendered x;
                                                                          }});
~~~

Then `.md` file will get rendered and be sent to client.


### index.* 

~~~js
demo.config.of('built-in').of('static-server').val('indexFile',['.html','.md']);
~~~

Then when you access `/`, it will return `index.html` and `index.md`. The priority  follows the order of `indexFile`. For our example, the `index.html` is preferred compared with `index.md`.
