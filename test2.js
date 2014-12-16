/*=========================================================================*/

var domain = require('domain');
var EventEmitter = require('events').EventEmitter;
var e = new EventEmitter();
function next(){
	e.once('data',function(){throw new Error();});
     //ok e.emit('data'); 
     //ok process.nextTick(function (){e.emit('data');});
}
var d = domain.create();
d.on('error',function(e){throw e;});
d.add(e); //if this, then no error.



//d.run(next);
//如果emitter在d的外面, 则会跟踪不到. 所谓里面不一定是一定要定义在里面.

dsmall = domain.create('domain');
dsmall.scope = 'it works';
dsmall.on('error', function(e){
	console.log(e.domain.scope);
});
dsmall.add(d); //must have 
dsmall.run(function(){
	d.run(next);
});



//trigger;
e.emit('data');  //error if not add












