// @flag('哺乳类')
class Animal{
    constructor(name){
        this.name = name;
        this.eat = '吃肉'
    }
    @readonly
    pi = '3.14';  // 实例上的属性，并不是原型上的属性
    @before
    say(a,b,c){        // 类的原型上的方法
        console.log(1,2,3);
    }

    // static flag = 123
}
// 1) 类的静态属性
// function flag(value){
//     return function(constructor){
//         constructor.type =  value;
//     }
// }
// 2) 实例上属性
function readonly(target, property,descriptor){
    // setTimeout(()=>{
    //     console.log(target == Animal.prototype); //true
    // })
    descriptor.writable =  false;
}

// 3）
function before(target, property, descriptor){
    let oldValue =  descriptor.value;
    descriptor.value = function(){
        console.log('before');
    }
    oldValue.call(target, ...arguments);
}

let animal =  new Animal();
// animal.pi = 3.15

animal.say(1,2,3);





// npm init y
// npm install @babel/cli -dev

// npm install @babel/core
// npm install @babel/plugin-proposal-class-properties -d

// npm install --save--dev @babel/preset-env 
// npx babel es_babel.js -o es5.js -w
