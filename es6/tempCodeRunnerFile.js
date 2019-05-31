function Animal(name){ 
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
console.log(a1.constructor);