- 似乎不能在一个repl里面load多个模块, 因为node有module cache机制, 会把load过的模块(比如builtin)cache住, 
而不会执行builtin中的程序, 所以难道safeRequire里面要require后马上清空cache不成?
- 似乎这样可以解决问题






