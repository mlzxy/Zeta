---
layout: guide
title: Builtin Service
date: 2015-01-22
---

#Builtin Service

##Overview
Zeta.js has provided several kinds of service in common use in order to make it convenient for users to write the server-side code for web application. In the parts followed, we will introduce them in brief  for you separately.

##Render

The service render can handle a file or a string. For now, it just support html file and swig engine, but it's easy for you to extend it as it's implemented through Provider.

###Render A String
You need to use the provider $render explicitly to render a string even there are variables in it.

~~~js
demo.get('/',function($scope,$render){
    $scope.end($render.text('<p>{{msg}}</p>'),{
        msg:"hello,world"
    });
});
//demo is a module
~~~

###Render A File
We have exposed an ease api for you to render html or swig file.

~~~js
demo.get('/',function($scope){
    $scope.render('/index.swig',{
        title:'Welcome'
    })
});
~~~

##Cookie
The cookie service has been mentioned in chapter Factory, in fact, it's a Factory indeed.

###Get Cookie

~~~js
var user=$cookie.val('user');
//return a cookie named user
~~~

###Set Cookie

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

##Form
We use the famous formidable plugin to handle form upload no matter that the client wants to submit a json object or a series of files. The factory $form returns a IncomingForm object of formidable, for the next operation, you can refer to formidable's documents.

~~~js
demo.post('/',function($scope,$form){
    .....
});
//$form is a IncomingForm object of formidable
~~~

##Static Server
The static server service returns static file such as html, css, img files and so on to the client side automatically even if you haven't set how to handle requests whose path consistent with those files' relative path.

###Start Static Sever

~~~js
demo.config('public',__dirname+'/public');
demo.load();
demo.any('static');
~~~

For instance,  ./public/avatar.img will be transferred to client side when request for path '/avatar.img' arrives if the image file really exists. Otherwise you will get a 404. The subdirectory is also supported and you can left the last letter '/' of file path out.

###Index Situation

Static Server will also search files named as index.** in the directory consistent with your request path while the suffix of filename can be assigned by you. For now, there are three kinds of suffix supported, html, htm and md. Here are examples.

~~~js
demo.config.of('built-in').of('static-server').val('indexFile',['.html','.md']);
//allow index file with suffix as html or md
//you get /views/index.html when request for path /views
~~~

What's more, the priority of suffix follows the order of your config array. For our example, the index.html is preferred compared with index.md.
