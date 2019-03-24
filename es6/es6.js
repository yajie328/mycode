
// let a=1;
// console.log(window.a)

// 合并数组
// let a=[1,2,3];
// let b = [3,4,5];
// let c = [...a, ...b];
// console.log(c); //[ 1, 2, 3, 3, 4, 5 ]

// 合并对象
let obj={a:1,b:2};
let obj2 = {b:0,c:3,d:4};
let obj3 = {...obj, ...obj2};
console.log(obj3); //{ a: 1, b: 0, c: 3, d: 4 } 如果有相同的key，后面的权重高

let obj4 = Object.assign(obj,obj2);  // 和...一样只能复制1层
console.log(obj,obj4, obj == obj4); // { a: 1, b: 0, c: 3, d: 4 } { a: 1, b: 0, c: 3, d: 4 } true

// set map
let s = new Set([1,2,3,4,1,2,3,4]);
console.log(typeof s); // 基础类型 string number boolean undefined object symbol
s.add('5');

// console.log(s, ...s); //Set { 1, 2, 3, 4, '5' } 1 2 3 4 '5'
// console.log(s.keys()) //[Set Iterator] { 1, 2, 3, 4, '5' }
// console.log(s.entries()); //[Set Iterator] { 1, 2, 3, 4, '5' }
// console.log(s.values()) //[Set Iterator] { 1, 2, 3, 4, '5' }
s.forEach(v=>{
    console.log(v); // 1 2 3 4 5
})


