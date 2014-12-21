# 需要测试的内容

大方向分了两个, 每个大方向下, 都有很多测试内容, 对应每个测试集都有不同的配置参数需要测试.


# module

module的依赖机制, 是程序运行的核心.

## 测试内容

- Simple case

m1 <- [m2]
m2 <- [m3]


- complex case

m1 <- [m2,m3]
m2 <- [m3,m4]
m3 <- [m5,m6]


- lots of module case

m1 <- [m1:5]
m2 <- [m3:6]
m3 <- [m4:7]
m4 <- [m5:7]
m5 <- [m6:7]
m6 <- [m7,m8]

- circular simple case

m1 <- [m2]
m2 <- [m1]

- circular complex case

m1 <- [m2,m3]
m2 <- [m3,m4]
m3 <- [m1,m5]

- circular lots of module case

m1 <- [m1:5]
m2 <- [m3:6]
m3 <- [m4:7]
m4 <- [m5:7]
m5 <- [m6:7]
m6 <- [m1,m7]

## 不同配置

- `circleCheck = true or false`

## 测试目的 


- 验证现有代码应付大量module情况下, 保持正确性

- 检验Zeta对于circular依赖处理是否正确

- 验证是否能够做到每个module的config值在继承树中正确传播



# web 

在module依赖机制的基础上, 加上了web相关服务的module, 边形成了这个framework


## 测试内容

- simple handler链处理

[h1,h2]

- 长handler链处理

[h1,h2,h3,h4,h5,h6,h7,h8]

- 长handler中跳转处理

h1->h2    h3 -> h4
    |     ^
    -> z  |
       |  |
       -> y

- error handling验证

`guard.get().post().with(f)`

- static server验证

- 需要人为写出一定量的`factory`和`provider`, 来测试依赖注入的正确性

- 验证built in 模块正确性
 - $render
 - $form
 - $cookie
  - expired time
  - opt测试一两个, 保证cookie的options能够被顺利设置

## 不同配置参数

- 针对`["get", "post", "put", "head", "delete", "options", "trace", "connect","any"]`, 每个进行验证(换个方法名字就行)

- `debug = false or true`

- `serviceCache = false or true`

- `guard = false or true`
 - `globalDomain = false or true`

## 测试目的

- 验证路由链的正确性
- 验证依赖注入的正确性
- 验证service Caching的正确性
- 验证error handling系统的正确性
- 验证builtin services的正确性
- 验证router方面对于http不同方法的正确性



