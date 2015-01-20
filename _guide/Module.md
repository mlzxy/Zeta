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

The module is the only function that `require('zeta')` have, it's very easy to use.

## Create a Module


## Config dependents


# Attention

## Circular Dependency


## Multiple Module in one File

## Should Not Do



