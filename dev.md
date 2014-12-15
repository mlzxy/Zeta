- unify the dependent module code and master module code [x]
- change createServer().listen, don't use `prototype.on` [x]
- add factory cache   [x] 
- add chain call, and shortcut name for methods    [x]
- fix bugs in any and static_server              [x]

======================


- 为错误处理加上双保险

`m.guard.get('/',f).post('/lf',p).get('/o',O).with(fe);`

in the common fun:   `try{}catch{ego($scope,which one)}`
And in the fe:
`try{} catch{ print and pass;}`

you could `$scope.resume === $scope.go('next')` 

其实go next, 已经是可以非常灵活的错误控制了, 这个guard with只是一个双保险.


- log 不用实现, 交给程序员自己考虑  [x]




