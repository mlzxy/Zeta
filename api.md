---
layout: gpost
title: API Reference
permalink: /api/
---

## Zeta

### zeta.module

#### module#zeta.module(Name,[,dependency...])
Create a module instance.

#### Parmeters
- Name(String)Your module name
- [dependency](Array)All module names your module depends on


## Module

### m.any

#### module#m.any(x)
Handle unregistered requests.

*Parameters*

- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope

### m.app

#### server#m.app(port,bool)
Start a server and attach it to a module.

*Parameters*

- port(Integer)The port your server will listen to
- bool(Boolean)Recreate the server when it's true while using the server from cache for flase, default is false

### m.config

1. configObject#m.config(key)
Return the value of the option you specific.
*Parameters*
- key(String)Option name you specific

2. module#m.config(key,val)
Set the value of the option sepecificed by key.
*Parameters*
- key(String)Option name
- val(String,Boolean)Value you want to set

3. NamespaceObject#m.config.of(namespace)
Get configure namespace.
*Parameters*
- namespace(String)

4. NamespaceObject#m.config.of(namespace).val(key,value)
Set the value of the key option in the namespace. 
*Parameters*
- name(String)Namespce name
- key(String)The option name you want to set
- value(String,Array,Object)The option value you want to set

### m.delete

#### module#m.delete(path,x)
Register handlers for http-delete requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope


### m.factory

#### factory#m.factory(name)
Get the factory already defined.

*Parameters*

- name(String)The factory name

#### factory#m.factory(name,func)
Define a new factory.

*Parameters*

- name(String)The factory name you register
- func(Function)The factory entity you define

### m.get

#### module#m.get(path,x)
Register handlers for http-get requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope


### m.guard

#### module#m.guard(emt)
Set the global errorhandler.

*Parameters*

- emt(Emitter)The emmiter object used to handle global exceptions

### m.handler

#### handler#m.handler(name)
Get the handler already defined.

*Parameters*

- name(String)The handler name

#### handler#m.handler(name,func)
Define a new handler.

*Parameters*

- name(String)The handler name you register
- func(Function)The handler function with its first argument as $scope

### m.head

#### module#m.head(path,x)
Register handlers for http-head requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope


### m.load()
Load dependency modules.

### m.option

#### module#m.option(path,x)
Register handlers for http-option requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope

### m.post

#### module#m.post(path,x)
Register handlers for http-post requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope

### m.provider

#### provider#m.provider(name)
Get the provider already defined.

*Parameters*

- name(String)The provider name

#### provider#m.provider(name,obj)
Define a new provider.

*Parameters*

- name(String)The provider name you register
- obj(Object)The provider entity you define

### m.put

#### module#m.put(path,x)
Register handlers for http-put requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope

### m.trace

#### module#m.trace(path,x)
Register handlers for http-trace requests.

*Parameters*

- path(String)Relative url the clent requests
- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope



### m.with

#### m.guard.get(..).post(..).with(x)
Add error handler for requests registered next to the guard.

*Parameters*

- x(String,Array,Function)The handler name, a chain of handlers or a handler function with its first argument as $scope


## $scope


## Builtin Service

### $cookie

#### CookieObject#$cookie.write(res)
Write cookie to the client.

*Parameters*

- res(Object)The response object of node

#### String#$cookie.val(key)
Return the value of the specific cookie

#### CookieObject#$cookie.val(key,value)
Set the cookie named key.

*Parameters*

- key(String)Cookie name
- value(String)Cookie value

#### CookieObject#$cookie.val(key,value,opt)
Set the cookie with options initialized.

*Parameters*

- key(String)Cookie name
- value(String)Cookie value
- opt(Object)The option object of cookie

#### CookieObject#$cookie.val(key,value,optName,optValue)
Set cookie value and option value.

*Parameters*

- key(String)Cookie name
- value(String)Cookie value
- optName(String)The option name you want to specify
- optValue(String,Number,Bool)The option value you want to set

### $form
[Please refer to formidable document](https://github.com/felixge/node-formidable)


### $render

#### String#$render.text(str,json)
Return a new string with variables replaced according to json.

*Parameters*

- str(String)The string in swig format you want to render 
- json(Object)Variables in string and their values

