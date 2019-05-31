// apply 每个函数都有这个apply方法，改变上下文执行环境， 即改变this的指向， 并执行这个函数
let obj = {
	a: 1,
	b: 2
}
function fn2(){
	console.log('fn2',arguments)
}
function fn1(){
	console.log(this)
	console.log('fn1', arguments);
}

Function.prototype.apply = function(context,args){
   context  =  context? Object(context): window;
   context.fn = this;
   if(!args){
	 return context.fn();
   }
   
	let r = context.fn(args)
	delete context.fn;
	return r;
}
fn1.apply(fn2, ["a","b"]);
// 多个call会让call方法执行 并且把call中的this变成fn2


