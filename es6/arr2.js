
/* let target = {
    name: 'Tom',
    age: 24
}
let handler = {
    get: function(target, key) {
        console.log('getting '+key);
        return target[key]; // 不是target.key
    },
    set: function(target, key, value) {
        console.log('setting '+key);
        target[key] = value;
    }
}

let proxy = new Proxy(target, handler);
proxy.name;
proxy.age = 18; */

function update(val){
    console.log('更新了'+ val);
}
let arr = [1,2,3,4];
let proxy =  new Proxy(arr, {
    get(target,key){
        return target[key];
    },
    set(target,key,value){
        if(key == 'length') return true;
        update(value);
        Reflect(target, key, value);
        // target[key] = value;
        // update(value);
    }
});

proxy[4]=5;
console.log(proxy);


//arr reduce
// reduce常见的功能 多个数据 最终变成了一个数据
let keys = ["name","age"];
let values = ['daya',"19"]; 
let obj = keys.reduce((prev, cur, index)=>{
    console.log(prev, cur);
    prev[cur] =  values[index];
    return prev;
},{});
console.log(obj); //{ name: 'daya', age: '19' }

let sum = function(a, b){
    return a+b;
}
let toUpper =  function(str){
    return str.toUpperCase();
}
let add = function(str){
    return "***" + str + "******";
}
// 实现一个componse方法
//1.
// function compose(...fns){
//     let fnLast = fns.pop();
//     return function(...args){
//         return fns.reduceRight((prev, cur,index)=>{
//             return  cur(prev);
//         }, fnLast(...args))
//     }
// }
//2.
// function compose(...fns){
//     return  fns.reduce((pre,cur)=>{
//         return function(...args){
//             return pre(cur(...args));
//         }
//     })
// }
// 3
// function compose(...fns){
//     return  fns.reduce((pre,cur)=>{
//         return function(...args){
//             return cur(pre(...args));
//         }
//     })
// }
let compose = (...fns) => fns.reduce((pre,cur)=>(...args)=>cur(pre(...args)));
// add(toUpper(sum(a,b)))
// let result = compose(add,toUpper, sum)('hello',"daya");
let result =  compose(sum, toUpper, add)('hello','daya');
console.log(result);

// 实现数组的reduce
Array.prototype.reduce = function(callback,prev){
    for(let i=0; i<this.length; i++){
        // if(prev){
        //     prev =  callback(prev, this[i], i, this);
        // }else{ // 如果没定义， prev = this[0];
        //     prev = callback(this[i],this[i+1], i+1, this);
        //     i++;
        // }
        if(prev == undefined && i == 0){
            prev = this[0];
            i++;
        }
        prev = callback(prev, this[i], i, this);
           
    }
    return prev;
};

let a = [1,2,3].reduce((prev, cur)=>{
    return prev+cur;
},100);
console.log(a);



