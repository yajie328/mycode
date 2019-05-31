class Animal{
    constructor(name){  // // 实例上的属性
        this.name = name;
        this.eat = '吃肉'
    }

   
    say(){   // 原型上的共有属性
        console.log('say'); // es6 规范里 如果单独调用原型上的方法 this是不存在的
    }

    static flag(){ // 静态属性  // es7支持静态属性 es6只支持静态方法
        return 123
    }
}

// Animal(); // × 类不能被当作函数调用
// let animal =  new Animal('猴子');
// console.log(animal.__proto__ ==  Animal.prototype); // true 
// console.log(animal.__proto__); //Animal {}
// console.log(animal.constructor); //[Function: Animal]
// console.log(Animal.flag()); //123

class Tiger extends Animal{
    constructor(name){ 
        super(name)
    }
}

let tiger =  new Tiger('老虎');
console.log(tiger.name);
tiger.say();
