---
layout: guide
title: Scope
date: 2015-01-13
---


# Overview

`$scop`e is a special service that contains request & response information and a lot of other crucial utilities.

- You must use `$scope` as the first argument in handler

~~~javascript
m.get('/', function($scope){
    $scope.sendFile('index.html');
}
~~~

- You optionally use `$scope` as the first argument in factory 
//maybe should add async support to factory


# Getting Start
