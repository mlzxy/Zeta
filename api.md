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
- Name<String>Your module name
- [dependency]<Array>All module names your module depends on


## Module

### m.any

#### module#m.any(func)
Handle requests not registered.

#### Parameters
- func<Function>Handler function with its first argument as $scope

#### module#m.any([,handler...])
Register a chain of handlers for unknown requests.

#### Parameters
- [handler]<Array>Array of handler names registered

#### module#m.any('static')
Start the static server service.

### m.app

#### server#m.app(port,bool)
Start a server and attach it to a module.

#### Parameters
- port<Integer>The port your server will listen to
- bool<Boolean>Recreate the server when it's true while using the server from cache for flase, default is false

### m.config

#### configObject#m.config(key)
Return the value of the option you specific.

#### Parameters
- key<String>Option name you specific

#### module#m.config(key,val)
Set the value of the option sepecificed by key.

#### Parameters
- key<String>Option name
- val<String,Boolean>Value you want to set

#### NamespaceObject#m.config.of(namespace)
Get configure namespace.

#### Parameters
- namespace<String>

#### NamespaceObject#m.config.of(namespace).val(key,val)
Set the value of the key option in the namespace.

### m.delete

#### module#m.delete(path,func)
Register handler for http-delete requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.delete(path,[,hanler...])
Register a chain of handlers for http-delete requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.factory

#### factory#m.factory(name)
Get the factory already defined.

#### Parameters
- name<String>The factory name

#### factory#m.factory(name,func)
Define a new factory.

#### Parameters
- name<String>The factory name you register
- func<Function>The factory entity you define

### m.get

#### module#m.get(path,func)
Register handler for http-get requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.get(path,[,hanler...])
Register a chain of handlers for http-get requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.guard

### m.handler

#### handler#m.handler(name)
Get the handler already defined.

#### Parameters
- name<String>The handler name

#### handler#m.handler(name,func)
Define a new handler.

#### Parameters
- name<String>The handler name you register
- func<Function>The handler function with its first argument as $scope

### m.head

#### module#m.head(path,func)
Register handler for http-head requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.head(path,[,hanler...])
Register a chain of handlers for http-head requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.load()
Load dependency modules.

### m.option

#### module#m.option(path,func)
Register handler for http-option requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.option(path,[,hanler...])
Register a chain of handlers for http-option requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.post

#### module#m.post(path,func)
Register handler for http-post requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.post(path,[,hanler...])
Register a chain of handlers for http-post requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.provider

#### provider#m.provider(name)
Get the provider already defined.

#### Parameters
- name<String>The provider name

#### provider#m.provider(name,obj)
Define a new provider.

#### Parameters
- name<String>The provider name you register
- obj<Object>The provider entity you define

### m.put

#### module#m.put(path,func)
Register handler for http-put requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.put(path,[,hanler...])
Register a chain of handlers for http-put requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.trace

#### module#m.trace(path,func)
Register handler for http-trace requests.

#### Parameters
- path<String>Relative url the clent requests
- func<Function>Handler function with first argument as $scope

#### module#m.trace(path,[,hanler...])
Register a chain of handlers for http-trace requests.

#### Parameters
- path<String>Relative url the clent requests
- [handler]<Array>Array of handler names registered

### m.config.of(name).val

### m.with




## $scope

### $scope.sendFile

#### $scope#$scope.sendFile(path)

#### Parameters

### $scope.render

#### $scope#$scope.render(path)

#### Parameters

### $scope.send

#### $scope#$scope.send(x)

#### Parameters


### $scope.json

#### $scope#$scope.json(obj)

#### Parameters



### $scope.status

#### $scope#$scope.status(num)

#### Parameters


### $scope.head

#### $scope#$scope.head(key,val)

#### Parameters

### $scope.go

#### undefined#$scope.go(name)

#### Parameters



## Builtin Service

### $cookie

#### String#$cookie.val(name)
Return the value of the specific cookie

#### 


### $render

#### String#$render.text(str,json)
Return a new string with variables replaced according to json.

#### Parameters
- str<String>The string in swig format you want to render 
- json<Object>Variables in string and their values

