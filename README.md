# Zeta Documentation


## Guide Template

```
# Overview

# Getting started

# ...

# Attention

# More Material 
```


## Guide Table of Contents (TODO)




- routing                                                 [suemi]
路径声明方式1
和express一样, (简介scope)
路径声明方式二
先注册handler, 直接get他的名字(字符串)
路径声明方式三
get对应一个数组, 这时候讲如何3个handler之间如何交互go, (说明scope共享)
之后再讲go可以跳到其他地方再回来(最好有张图)


- scope                                                  [BenBBear]
就是response, 里面有什么函数, 分别怎么用. 如何定制scope
其他还未讲过的scope变量, 列出来, 一句话简介.

- builtin services                                       [suemi]
每个介绍一下

- error handle                                           [BenBBear]
domain(node天生很难解决error throw问题) 这个放在more materials里面
讲一下global domain怎么用, 但是有问题, 具体怎么回事, 看more materials

- config                                                 [suemi]
namespace, 每个option讲一下


- a complete demo                                        [BenBBear]
改一下angular-express-seed

- api reference                                          [all together]  
