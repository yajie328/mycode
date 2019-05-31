// 原型prototype 原型链__proto__
// 每一个函数都有一个prototype属性
// 每一个对象都有__proto__属性

function Animal(type){
	this.type = type;
}
Animal.prototype.type="哺乳"
Animal.prototype.a = 1;

let animal = new Animal('哺乳类')
delete animal.type;
console.log(animal.type)
// 当获取type属性时首先在自己上面查找，找不到会从他的原型链上查找
// 而prototype本事也是一个对象 也有__proto__ , Animal.prototype.__proto__ === Object.prototype
console.log(Animal.prototype.__proto__ == Object.prototype); // true
console.log(Object.prototype.__proto__) // null 直到找到顶层的为止

// Function Object 可以充当对象也可以当函数
// 既有prototype 也有__proto__
console.log(Function.__proto__ === Function.prototype); //true
console.log(Object.__proto__ === Function.prototype);  //true
console.log(Object.__proto__ === Function.__proto__)   //true

console.log('a' in animal); // true
console.log(animal.hasOwnProperty('a'))  // false
// in 关键字 会判断这个属性是否属于原型， 或者实例上的属性
// hasOwnProperty 只会判断是否存在当前的实例上

