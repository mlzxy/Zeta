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

Then if  your server `throw error` on `/`, rather than crash, it will return user a `500`.

# Getting Start

The `guard.with` is very easy to use and  carries limitations.

## Use

### 


## Limit





[{{ site.baseurl }}/guide/more-on-error-handle.html](Next Post)
