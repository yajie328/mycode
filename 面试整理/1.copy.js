// 浅拷贝 
//...运算符
/* 
let obj = {name:'daya', position:{x:20,y:30}}
let o = {...obj};
obj.position.x = 200
console.log(o, obj); 
*/

/* 
let a= [1,2,3]
let arr = [a];
arr[0][0] = 100;
a[3] = 4;
console.log(arr, a);  //[ [ 100, 2, 3, 4 ] ] [ 100, 2, 3, 4 ]
 */

// 深拷贝
// 1 利用JSON.stringify 先转换成一个字符串这样就和之前的毫无关系了
// 缺陷：不完整 不能实现复杂的拷贝，比如 函数/undefined 类型的会丢失
/* 
let obj = {name:'daya', position:{x:20,y:30},f:function(){}, un: undefined}
let o = JSON.parse(JSON.stringify(obj));
obj.position.x =200;
console.log(obj,o);  
// { name: 'daya',position: { x: 200, y: 30 },f: [Function: f],un: undefined } 
// { name: 'daya', position: { x: 20, y: 30 } } 
 */

//2 递归拷贝
function deepClone(obj, hash = new WeakMap()){
	if(obj ==null) return obj; // 如果是null和undefined就不就行拷贝
	if(obj instanceof Date) return new Date(obj);
	if(obj instanceof RegExp) return new RegExp(obj);
	// 普通的值 函数不需要深拷贝
	if(typeof obj !== 'object') return obj; 

	if(hash.get(obj)) return hash.get(obj); 
	// 是对象就进行深拷贝[] {}
	let cloneObj = new obj.constructor;
	hash.set(obj, cloneObj);   // 解决递归引用问题
	for(let key in obj){
		if(obj.hasOwnProperty(key)){
			cloneObj[key] = deepClone(obj[key], hash); // 实现一个递归拷贝
		}
	}
	return cloneObj;
}
// obj 
// 1) null/undefined    null==undefined //true
// 2) new Date()
// 3) new RegExp()
// 4) 普通的值  如果是函数 不需要深拷贝
// 5) 是对象 new一个obj的构造函数得到newObj，然后把obj深拷贝到newObj
// 6) 循环引用问题 比如obj.o = obj 不断的循环引用 会报错 RangeError: Maximum call stack size exceeded
	//    利用es6 WeakMap 实现循环引用

let obj = {name:'daya', position:{x:100}};
obj.o = obj;
let newObj = deepClone(obj);
obj.position.x = 200;
console.log(newObj); // { name: 'daya', position: { x: 100 }, o: [Circular] }

