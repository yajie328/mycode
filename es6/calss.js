// es6 类  es5 构造函数
//1.了解构造函数的属性
/* function Animal(name){ 
    // 实例上的属性
    this.name= name;
    this.arr = [1,2,3];
    this.type = '动物';
}
// 公有属性
Animal.prototype.address = {'location': '山里'};

let a1 = new Animal('猴子');
let a2 = new Animal('小鸡');
console.log(a1.arr === a2.arr); // false 实例上的属性
console.log(a1.address === a2.address); // true 共有属性
 // 每个实例都有一个__proto__ 指向所属类的原型
console.log(a1.__proto__ === a2.__proto__);  //true
console.log(a1.constructor === a2.constructor); // true
console.log(a1.constructor); */

// 2.类的继承
function Animal(name){
    this.name = name;
    this.eat = '吃'
}
Animal.prototype.address = {location:'山里'};
Animal.prototype.eatfoot =  function(foot){
    console.log('eat'+foot);
}
function Tiger(name){
    this.age = 10;  
    Animal.apply(this,arguments);
}
// Tiger.prototype.__proto__ = Animal.prototype; //等价下面的方法
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype);  //es7
// Object.create() // es5的方法
Tiger.prototype =  Object.create(Animal.prototype,{constructor: {value:Tiger}});
// 自己封装一个create
/* function create(parentPrototype, parent){ 
    let Fn = function(){};
    Fn.prototype = parentPrototype;
    let fn =  new Fn();
    fn.constructor =  parent;
    return fn; //当前实例可以拿到 animal.prototype
}
Tiger.prototype  = create(Animal.prototype, 'Tiger');
*/
Tiger.prototype.say = function(){
    console.log('说话');
};

let a1 = new Tiger('猴子');
a1.say();
a1.eatfoot('肉');
console.log(a1.address);
console.log(a1.constructor);

// 实现继承：
// 1 call + Object.create()
// 2 call + Object.setPrototypeOf() / __proto__ 


