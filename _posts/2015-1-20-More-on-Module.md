---
layout: gpost
title: More on Module
premalink: /mt/more-on-module.html
---


## Init 

You could set `init function` for your module

~~~javascript
m.setInit(function(){
  this.val = 1;  //val will be accessible from this module
});
~~~

And the `init function` will be executed right after that module been load.

~~~javascript
for (var i in dependents){
   tmp_m = require(dependents[i]);
   tmp_m.init();
   m = merge(m,tmp_m);
}
~~~



## Circular Dependency

Zeta could handle circular dependency among modules. As long as there is not a dead lock kind of circle.

## Multiple Module in one File

It's usually useless to have multiple modules decleration in one file, like

~~~javascript
var m1 = require('zeta').module('m1',['stuff']),
    m2 = require('zeta').module('m2',[]);
~~~

The behavior will be `undefined` if some other modules try to load them.



## About Namespace

Note that the "namespace" is not just a syntax sugar for things like `m.config('ns',{u:1,v:2})`. 


`m.config.of('ns').val('u',1).val('v',2)` is equal to 


~~~javascript
m.config('ns',{u:1,v:1,_isNamespace:true});
~~~

Because when passing the configuration to dependent modules, whether 

~~~javascript
for(var v in m.config.options.b)
   deps.config.options.b[v]=b[v];
~~~

or just

~~~javascript
deps.config.options.b = m.config.options.b;
~~~

depends on **whether object b has _isNamespace attribute to be true.** 



## How it find modules

Here comes the ugly part :(  



> We know Zeta will find modules for you when the **root** is configed. And the module name don't have to be the same with the file name. 
>
>**But, how this works?**


In short, Zeta will read the first 10 lines of each js file in `root` directory. And use regex to match Pattern

~~~javascript
var P = /module\((\n|\ )*(\'|\")([^'"])*(\'|\")\,{0,1}(\n|\ )*\[{0,1}/
~~~

to get the `{modulename:filename}` map, and use this as lookup table to load all modules. So the guidelines are

- Module decleration must be within the first 10 lines
- Do not reassign the `module` method to another variable like `x = zeta.module; m = x('name',[])`
- Do not use variable in call to module like `module(name, array)`, but instead use raw String & Array like `module('name', [])`.


