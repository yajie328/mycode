function Animal(type){
	this.type = type;
	// return {name:'daya'}
}
Animal.prototype.say= function(){
	console.log(this.type)
}

function myNew(){
	// Constructor =>Animal 剩余的arguments就是其他参数
	let Constructor = [].shift.call(arguments);
	let obj = {}; // 返回的结果
	obj.__proto__ = Constructor.prototype; // 继承原型上的方法
	let r = Constructor.apply(obj, arguments);
	return r instanceof Object? r: obj;
}

let animal = new Animal('哺乳类')
// let animal = myNew(Animal, 	'哺乳类');
animal.say();
// console.log(animal.name)
console.log( animal.__proto__ == Animal.prototype ) // true

