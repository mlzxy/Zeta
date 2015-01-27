---
layout: guide
title: Server
date: 2015-01-29
---

#Server
In this chapter you can learn how to manipulate a server.

##Start A Server

~~~js
m.app();
//start a server listening port 8000

m.app(integer,boolean);
//first argument is the port listening to

m.app(5000);
//listening to port 5000

//second argument means reading server from cache when it's flase, default is false

m.app(5000,true);
//recreating a server listening to 5000

//the first argument can be also left out
m.app(true);
~~~

##Get A Server

~~~js
var s=m.server();
//s is the server attached to module m

m.server(boolean);
//true means recreating a server and return it while false means reading server from cache

//default is false

var s=m.server(true);
//return a new server 
~~~