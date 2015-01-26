---
layout: guide
title: Config
date: 2015-01-20
---

# Config

## Overview
In this chapter, we introduce how to configure a module and some built-in configurations.

## Base Usage

### Set Config Value

~~~js
demo.config(key,value);
~~~
Key is the name of the option you desire to change and value is what you want it to be.

### Get Config Value

~~~js
var val = demo.config(key);
//the option of key
var opt = demo.config();
//get all config values
~~~

### Load The Config

You need to load the module after the config, if you want your config to take into effects.

~~~js
demo.config(key,val);
...
demo.load();
~~~

## Namespace
The namespace part has been explained in the [module chapter](http://zetajs.io/guide/Module.html).

## What To Config

### Specific Directory

The root variable means where to search modules, while the public means the prefix path of the files for `static, sendFile, render`.

~~~js
//default option
demo.config('root',process.cwd());
demo.config('public',"public");
~~~

### Debug Option

- **loadinfo:Boolean**
True means to set `m.loadinfo` to loading information, default option is false.

~~~js
//default
demo.config('loadinfo',false);
~~~

- **debug:Boolean**
True means to print the detailed debug information, default option is true.

~~~js
demo.config('debug',true);
~~~

### Static Server

- **indexFile:Array** the suffix of index files that will be searched automatically.

~~~js
//default option
demo.config.of('built-in').of('static-server').val('indexFile', ['.html', '.htm', '.md']);
~~~

- **processFun:Object**

You could set render Engine for certain kind of file. See example in [here](http://zetajs.io/guide/built-in-service.html#render-files).

~~~js
//default option
demo.config.of('built-in').of('static-server').val('processFun', {});
~~~




### Error Handler
- **guard:Boolen**
True means that you can use the guard to handle those errors occurred in handlers, default option is false.

~~~js
//default option
demo.config('guard',false);
~~~

- **globalDomain:Boolean**
True means using one single global domain for your global EventEmitter instances for exception handling, default option is false.

~~~js
//default option
demo.config('globalDomain',false);
~~~

### Other
- **serviceCache:Boolean**
True means reading services from cache in the handler chain in order to speed up, default is true.

~~~js
//default option
demo.config('serviceCache',true);
~~~
