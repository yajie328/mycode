// 使用defineProperty 来实现vue2.0 响应式变化

function render(){
	console.log('更新了')
}
let obj = {
	name: 1,
	age: { age:1 }
}
let metheds = ['push', 'pop', 'shift', 'unshift', 'splice','reduce', 'sort'];
let arrayProto =  Array.prototype;
let proto = Object.create(arrayProto);
metheds.forEach((methed) =>{
	proto[methed] = function(){
		arrayProto[methed].call(this,...arguments);
		render();
	}
})

function observer(obj){
	if(Array.isArray(obj)){
		obj.__proto__ = proto;
		return;
	}
	if(typeof obj === 'object'){
		for( key in obj){
			defineReactive(obj, key, obj[key]);
		}
	}
}

function defineReactive(obj, key, value){
	observer(value);
	Object.defineProperty(obj, key, {
		get(){
			return value
		},
		set(newVal){
			observer(newVal);
			if(newVal != value){
				render()
				value = newVal;
			}
		}
	
	});
}

function $set(obj, key, value){
	if(Array.isArray(obj)){
		obj.splice(key, 1, value); // 数组则调用了splice的方法
	}
	defineReactive(obj, key, value)
}

// 如果属性不存在，默认后增加的内容 并不会更新视图 需要用$set
// defineProperty 不支持数组

// 测试对象
/* observer(obj);
obj.name = 2;
obj.age.age = 2;
obj.name = {name:1};
obj.name.name = 2; */

// 测试数组

// let arr= [1,2,3];
// observer(arr);
// arr.push(4);
// console.log(arr);
// arr[0] = 100;
// $set(arr, 0, 100); // 更新了
// console.log(arr[0]); //100

// 注: 不支持数组的长度变化 也不支持数组的内容发生变化 需要使用$set 必须通过上面的方法来触发更新 或者替换成一个新的数组

