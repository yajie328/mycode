// es5
/* let obj = {a:'1'};
let other = '';
// 通过defineProperty 定义的属性不可枚举
Object.defineProperty(obj, 'name', {
    enumerable: true, // 设置可枚举
    configurable: true, // 设置可删除 
    // writable: true,    // 设置可重写   get 和writable不能同时设置，否则会报错
    // value:"daya",
    get(){    // 取值就会执行get
        console.log('----')
        return other;
    },
    set(val){ // 设置值会执行set
        other = val;
    }

})

// delete obj.name;
// obj.name = 'dachuang';
console.log(obj); // { a: '1' }
obj.name = '456';
console.log(obj.name); */

// 对象的setter和getter
/* let obj = {
    other: 123,
    get name(){
        return this.other;
    },
    set name(val){
        this.other = val;
    }
}
console.log(obj.name);
obj.name = 456;
console.log(obj.name); */

// vue的数据劫持（把所有属性都改成get和set方法）
let  obj={
    name: 'daya',
    age: 18,
    info:{
        school: '北航',
        child: 1
    }
}

function observer(obj){ // defineProperty 只能用在对象上，数组不识别
    if(typeof obj !== 'object') return obj;
    for(let key in obj){
        defineReactive(obj, key, obj[key]);
    }
}
function defineReactive(obj, key, value){
    observer(value);
    Object.defineProperty(obj, key, {
        get(){
            return value;
        },
        set(val){
            if(val != value){
                observer(val);
                value = val;
                upDate();
            }
        }
    })
}

function upDate(){
    console.log('更新了')
}

observer(obj);
// obj.name = 'dachuang';
// obj.age = 10;
// obj.info = {school : 'lalla', parent:1};
// obj.info.school='aaa';
obj.info=[1,2,3];
obj.info[0] = 0;

let methods = ['push', 'pop','shift','unshift','sort', 'splice'];
methods.forEach(mathod => {
    let oldMethod =  Array.prototype[mathod];
    Array.prototype[mathod]= function(){
        upDate();
        oldMethod.call(this, ...arguments);
    }
});

obj.info.push(4);
obj.info.push(5);


