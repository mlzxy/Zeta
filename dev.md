# 1

- unify the dependent module code and master module code [x]
- change createServer().listen, don't use `prototype.on` [x]
- add factory cache                                      [x] 
- add chain call, and shortcut name for methods          [x]
- fix bugs in any and static_server                      [x]

# 2

- chain call                                             [x]

- log 不用实现, 交给程序员自己考虑                           [x]


# 3

- 理想中的错误处理

`m.guard.get('/',f).post('/lf',p).get('/o',O).with(fe);`

`m.guard.get('/').post('/f').get('/o').with(fe);`

其实go next, 已经是可以非常灵活的错误控制了, 这个guard with只是一个双保险.

`m.guard(eventEmitter);` or `m.guard('name');`

使用domain来实现, 每个路径一个domain,  (and you could attach an emitter to multiple domain, which would be fired depends on which domain gets run.)
each domain都是一样的, 只不过动态add req,res.
`m.guard.get('/',f).post('/lf',p).get('/o',O).with(fe);`

`m.guard.get('/').post('/f').get('/o').with(fe);`

为相应的domain装上一个fe作为on error函数.



接下来有两个问题要解决: 

1. 如何domain.run go

2. 如何能把$scope信息加入domain的on error函数  

__已经可以解决, 例子看test.js__











