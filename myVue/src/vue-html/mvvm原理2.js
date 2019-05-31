// 使用proxy来实现数据响应式的变化
// 可以支持数组，而且不用区分是对象还是数组
// 兼容性 vue3.0    会采用如果支持proxy则使用proxy, 不支持就还是Object.defineProperty

function render(){
    console.log('模拟视图的更新');
}

let obj = {
    name: 1,
    age: { age:1},
    list:[]
}
let arr = [1,2,3];

let handler = {
    get(target, key){
        if(typeof target[key] === 'object' && target[key] != null){
            return new Proxy(target[key], handler)
        }
       return Reflect.get(target, key);
    },
    set(target, key, value){
        if(key === 'length'){
            return true;
        } 
        render();
        return Reflect.set(target, key, value);
    }
}

// 测试
let proxy = new Proxy(obj,handler);
// proxy.name =2;
// proxy.age.age =3;
// proxy.list.push(23);
// proxy.list[2] = 3;
// console.log(proxy);

