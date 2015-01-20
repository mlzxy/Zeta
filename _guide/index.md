---
layout: guide
title: Introduction
date: 2015-01-16
---

![npm version](https://badge.fury.io/js/zeta.svg)
![](https://travis-ci.org/BenBBear/Zeta.svg)
![](https://coveralls.io/repos/BenBBear/Zeta/badge.png)

~~~javescript
var m = require('zeta').module('test',[])
m.config('root',__dirname)

.load()
.get('/', function ($scope) {
  $scope.send('Hello World').end();
})
.app(8000);
~~~





## Installation

~~~shell
npm install zeta
~~~


## Features


## Quick Start



## Tests

To run the test suite, first clone the code, install the dependancies, then run `npm test`:

~~~shell
$ git clone https://github.com/BenBBear/Zeta dir && cd dir
$ npm install
$ npm test
~~~

Notice that you may get a **maximum stack size exceed error**. My workaround is change the file header of the **dir/node_modules/gulp/bin/gulp.js**   from `#! /usr/bin/env node` to `#! node --stack-size=<number larger than 65500>`.

## License

MIT
