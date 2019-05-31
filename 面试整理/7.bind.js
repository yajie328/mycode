// bind 
// 改变this指向
// 并返回一个绑定后的函数 (高级函数)
// 参数可以分批传递
// 如果绑定的函数被new了， 当前函数的this就是当前的实例
// new出来的结果可以找到原有类的原型
let obj = {
	name: 'daya'
}
function fn2(){
	console.log('fn2',arguments)
}
function fn1(name, age){
	console.log(this.name + '养了一只'+name +age +'岁了');
	console.log(this);
}

Function.prototype.bind =  function(context){
	let that = this;
	let bindArgs =  Array.prototype.slice.call(arguments, 1);
	function Fn(){}
	function fBound(){
		let args = Array.prototype.slice.call(arguments);
		return that.apply(this instanceof fBound?this: context,bindArgs.concat(args))
	}
	Fn.prototype = this.prototype;
	fBound.prototype = new Fn();
	return fBound;
}
fn1.prototype.flag = true
let bindFn = fn1.bind(obj,'猫'); 
let instance = new bindFn(9);
console.log(instance.flag)
// bindFn(8) // daya养了一只猫8岁了