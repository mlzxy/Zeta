---
layout: guide
title: Error Handle
date: 2015-01-19
---

# Overview

Zeta provide built-in support for error handling, and you could enable it by

~~~javascript
m.config('guard',true);
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

Then if  your server `throw error` on `/`, rather than crash, it will return user a `500`. **(with limitation)**

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


## Limit





[{{ site.baseurl }}/guide/more-on-error-handle.html](Next Post)
