---
layout: guide
title: Routing
date: 2015-01-27
---

# Routing


# Overview
In this chapter, you will learn how to handle requests form client through Zeta. The code can be written in the familiar express way.

~~~js
m.get('/',function($scope){
	$scope.render('/index.html');
});
~~~

Dynamic Routing and Regex is also supported.

~~~js
m.get('/v1/time/:gmt(^\\+[0-9]{1,2}$)',function($scope){ 
	$scope.end($scope.params.gmt);
});
~~~

- the rule is `/:varname(pattern)`


## Handler

### Single Handler

The work can be also completed by handlers.

~~~js
m.handler('h0',function($scope){
	$scope.render('/index.html');
});
m.get('/','h0');
~~~
You can also use `h` for `handler` in short like below.

~~~js
m.h('h0',function($scope){
	$scope.render('/index.html');
});
~~~

### Chain Handlers
A chain of handlers is also allowed.

~~~js
m.h('h0',function($scope){
	$scope.count=0;
	$scope.go('next');
});

m.h('h1',function($scope){
	$scope.count++;
	$scope.go('next');
});

m.h('h2',function($scope){
	$scope.send($scope.count.toString());
});

m.get('/', ['h0','h1','h2']);
~~~
The function $scope.go described in chapter $scope, which enables you jump from one handler to another.


And you could mix `function` and `string` in the chain, like below:

~~~javascript
m.get('/', [function($scope){$scope.go('next');},
            'h1']);
~~~

## Request Methods

### Any

The paths that haven't caught by anyone will go `any`.

~~~js
m.any(function($scope){
	$scope.status(404).end('Not Found');
});

### Other Methods
Zeta supports almost all http methods including get, post, head, put, delete, option, trace and any. All methods have the same interface. Here is an instance for post.

~~~js
m.post('/',handler);
m.post('/',function($scope){..});
~~~

## Routing Path
With powerful $scope.go, you can design your own routing path using handlers in the chain.

~~~js
m.h('h0',function($scope){$scope.go('h2')});
m.h('h1',function($scope){$scope.go('h3')});
m.h('h2',function($scope){$scope.go('h4')});
m.h('h3',function($scope){$scope.end('hello');});
m.h('h4',function($scope){$scope.go('next')});
m.h('h5',function($scope){$scope.end('hi')});
m.get('/',['h0','h1','h2','h3','h4','h5']);
//h0->h2->h4->h1->h3 is the routing path
~~~

![Routing Example]({{site.url}}/img/routing.png)

Remember it will return to the original next handler if it has gone other handlers before going next, just as the same with the example.

