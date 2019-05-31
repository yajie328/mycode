// call 每个函数都有这个call方法，改变上下文执行环境， 即改变this的指向， 并执行这个函数
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

Function.prototype.call = function(context){
   context  =  context? Object(context): window;
   context.fn = this;
   let args = []
	for(let i=1; i<arguments.length; i++){
		args.push('arguments[' +i+ ']'); 
	}
	//console.log(args); // ["arguments[1]", "arguments[2]"].toString() // "arguments[1],arguments[2]"
	// 利用数组toString的特性
	let r = eval('context.fn('+args+')')
	delete context.fn;
	return r;
}
fn1.call(obj, 'a','b');
// 多个call会让call方法执行 并且把call中的this变成fn2


