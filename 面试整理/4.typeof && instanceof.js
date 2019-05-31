// typeof 和instanceof 的区别
// typeof 效验原始数据类型  string number boolean undefined  object symbol
// [] {} reg function 不能判断

console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
console.log(typeof new RegExp()); // object

// 只能校验已经存在的对象
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call({})); //[object Object]
console.log(Object.prototype.toString.call(new RegExp())) //[object RegExp]

// 不能效验自定义类型
class A{}
let a = new A();
console.log(Object.prototype.toString.call(a)) //[object Object]

//instanceof
console.log([] instanceof Array); // true
console.log([] instanceof Object); //true
console.log([].__proto__ === Array.prototype) // true;
console.log([].__proto__.__proto__ === Object.prototype) // true



function instanceOf(a,b){
    a = a.__proto__;
    while(true){
        if(a === null){
            return false;
        }
        if(a == b.prototype){
            return true
        }
        a = a.__proto__;
    }
}

console.log(instanceOf(a, Function));

console.log('hello' instanceof String); // false  不能判断基本类型
// instanceof 默认调用Symbol.hasInstance
console.log(String[Symbol.hasInstance]('hello')); //false
// 重写
class validateStr{
    static [Symbol.hasInstance](x){
        return typeof x === 'string';
    }
}
console.log(validateStr[Symbol.hasInstance]('hello')); // true
console.log( 'hello' instanceof validateStr) // true

// 还可以找对象的constructor