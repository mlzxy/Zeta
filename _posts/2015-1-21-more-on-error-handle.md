---
layout: gpost
title: More on Error Handle
premalink: /mt/more-on-error-handle.html
---


#  More on Error Handle


## Use

To catch exceptions from more EventEmitter, you have to enable it by

~~~javascript
m.config('globalDomain',true); //by default it's false
~~~


Then, you could 

~~~javascript
var mg = require('mongoose')
m.guard(mg);   // will use domain to catch exceptions thrown in mg, globalDomain.add(mg);
m.guard.get().with(fe);
~~~



## How 

Here is how handler chain begins when you `config('globalDomain', true)`.  

~~~javascript
var d = domain.create();
d.add(req);
d.add(res);
d.add(globalDomain);
d.run(function() {
        globalDomain.run(function() {
        $scope.go(fstate);
     });
});
~~~

## Limit




### Simple Explain on Domain

~~~javascript
d.add(globalDomain)
~~~

This will set `globalDomain.domain`  to `d`. When the exception thrown on `globalDomain`, then `node` will emit that `error` to `globalDomain.domain` instead of making it uncaught.


### Limitation

Back again the code:

~~~javascript
d.run(function() {
        globalDomain.run(function() {
        $scope.go(fstate);
     });
});
~~~

> However, reality is reality :(   


This method won't work always, because

- `globalDomain.domain` will be set at each request
- But there is only one `globalDomain`

If error throw on **request A**, but **request B** has already come, then `globalDomain.domain === B.domain`, **Request B** will jump to the Error Handler instead of **Request A**.


> What's worse, there seems no ideal choice around.


This scenario will certainly happen when you add a `EventEmitter` that shared across different requests to domain, but it's common for database and etc...


Maybe we have to face it, domain is not perfect and it's hard to handle async error. For availability of server, it's good to use both `domain` and `uncaught`.







