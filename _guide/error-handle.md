---
layout: guide
title: Error Handle
date: 2015-01-19
---

# Overview

Zeta provide simple built-in support for error handling, and you could enable it by

~~~javascript
m.config('guard',true);  //by default it's false
~~~

Then you could use 

~~~javascript
m.guard
 .get('/')
 .with(function($scope){  
       $scope.status(500)
             .end('Internal Server Error');
});
~~~

Then if  your server `throw error` on `/`, rather than crash, it will return user a `500`. 

# Getting Start

The `guard.with` is very easy to use and also carries limitations.

## Use

- guard `/` get path with `fe`

~~~javascript
m.guard.get('/').with(fe);  //'get' could be post, delete, put...
~~~

- guard all get paths with `fe`

~~~javascript
m.guard.get().with(fe);  //'get' could be post, delete, put...
~~~

- guard any paths that haven't been guarded 

~~~javascript
m.guard.any().with(fe); 
~~~

- set paths & guard

~~~javascript
m.guard.get('/', function($scope){   //could also be "post(x,y)", "any(x)" and etc... 
                            $scope.end('hello world');
                        })
       .with(fe); 
~~~


## Limit

> guard only catch exceptions from req & res and those EventEmitters that default binded to [domain](nodejs.org/api/domain.html).


Here is how guarded handler chain begins.

~~~javascript
var d = domain.create();
d.add(req);
d.add(res);
d.run(function() {
   $scope.go(fstate);
});
~~~

And in case you want to catch the exceptions from other EventEmitter like database, please see the [More on Error Handle]({{ site.baseurl }}/guide/more-on-error-handle.html).



