---
layout: guide
title: Module
date: 2015-01-16
---

# Overview

Module is the base of this framework, you could inject variables into module.

~~~javascript
var m = require('zeta').module('m1',[]);
m.x = 1;
~~~

Then these variables will be accessible when

~~~javascript
// in another file
var m = require('zeta').module('m2',['m1']);
m.x === 1 // => true
~~~

Actually, this framework cosists of only two things:

1. Module 
2. Some injected built-in services for easy web development.


# Getting started

The module is the only function that `require('zeta')` have, and it's very easy to use.

## Create a Module

Create a module is dead simple, create a file `foo.js` with

~~~javascript
var m = require('zeta').module('foo',[]);
m.foo = 'foo';
~~~

then you create a `foo` module.


## Load a Module

Somehow, you want to use `foo` in another module, then you have to do following things:

- make your module to depend on `foo`
- tell zeta where to find modules
- `load` all dependent modules

For Example, create `bar.js` in the same directory with `foo.js` with

~~~javascript
var m = require('zeta').module('bar',['foo'])  //bar depend on foo
.config('root',__dirname)  //find modules in __dirname
.load() //load dependent modules
.foo == 'foo' // true
~~~

### Module as NPM package 

Zeta will find the dependent modules inside the `root` directory and require them, if not found, it will try to `require(module.name)` as it's a npm package. 

> So in this way you could publish your module while everyone could install and load.


## Config modules

In some cases, it's useful to config the dependent modules before loading them, for example, **change another database url**. With config, you could archieve it easily.

In the index.js:

~~~javascript
var m = require('zeta').module('main',['database'])
.config('root',__dirname)
.config('mongo',<location>)
.load();
// m.connection available
~~~

In the db.js:

~~~javascript
var m = require('zeta').module('database',[]);
if (!url = m.config('mongo'))
   mongoose.connect(url);
else
   mongoose.connect(<default db url>);

m.connection = mongoose.connection;      
~~~

Notice that the configuration will be available right after the `module(x,[])` but not the `m.load()`.

### Config with Namespace

The `config` provide a little useful feature to seperate different options. 

~~~javascript
var m = require('zeta').module('m1',['stuff'])
.config.of('foo').val('u', {}).val('v',{});
.config.of('bar').val('u',{}).val('v',{});
~~~

In this way, you seperate the setting of `foo` from that of `bar`, keep the configuration clean. 

And nested namespace `m.config.of('ns').of('ns')` is supported. 


# Attention

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

Here comes the ugly part :(  **Don't read it if you haven't finished those sections above.**

---

We know Zeta will find modules for you when the `root` is configed. And the module name don't have to be the same with the file name.

> But, how this works?


In short, Zeta will read the first 10 lines of each js file in `root` directory. And use regex to match Pattern

~~~javascript
var P = /module\((\n|\ )*(\'|\")([^'"])*(\'|\")\,{0,1}(\n|\ )*\[{0,1}/
~~~

to get the `{modulename:filename}` map, and use this as lookup table to load all modules. So the guidelines are

- Module decleration must be within the first 10 lines
- Do not reassign the `module` method to another variable like `x = zeta.module; m = x('name',[])`
- Do not use variable in call to module like `module(name, array)`, but instead use raw String & Array like `module('name', [])`.


