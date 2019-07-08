// 改变原数组的方法
var a = [1,2,3,4,5];

/* var b = a.pop();   // 删除数组的最后一个并返回这一个，改变了原数组
console.log(a, b); */ // [ 1, 2, 3, 4 ] 5 

/* var b = a.push(6); // 往后面添加一个并返回，改变了原数组
console.log(a, b); // [ 1, 2, 3, 4, 5, 6 ] 6 */

/* //splice (index, length, insert1, insert2)  从index开始删除几个，并添加, 返回删除后的数组
var b = a.splice(1, 0, 6, 7); 
console.log(a, b); //[ 1, 6, 7, 3, 4, 5 ] [ 2 ] */

/* var b = a.shift(); // 删除数组的第一个，并返回这一个， 同样改变了原数组
console.log(a, b); */

/* var b = a.unshift(6); // 数组最前面插入一个， 并返回插入的这个， 改变了原数组
console.log(a, b); //[ 1, 2, 3, 4, 5 ] 5 */

// push 后添加 pop 后删除
// shift 前删除 unshift 前添加 
// splice 指定位置删除和插入

// 数组反转顺序
// console.log(a.reverse());

// 数组排序 -
/* a.sort((a,b)=>{
    return b-a;
});
console.log(a);  //[ 5, 4, 3, 2, 1 ] */

/* a.length--; // 也能改变原数组
console.log(a);  //[ 1, 2, 3, 4 ] */

//----------以上都可以改变原数组--------------//


//----------下面这些不会改变原数组--------------//
// 字符串的截取，并没有改变原数组
/* var  b = a.slice(1,3); // (start, end) 截取第start到end之间的(不包含end)
console.log(a, b); //[ 1, 2, 3, 4, 5 ] [ 2, 3 ] */

// 数组的遍历： foreach map filter some every reduce ，

// 1 forEach 单纯的循环遍历, 不会生成新的数组，没用返回值, b是undefined, 不能break循环, 不能continue
/* var b = a.forEach((value, index,arr)=>{
    if(index === 3 ){
        // break; // 报错  
    }
    return value;
});
console.log(a, b); //[ 1, 2, 3, 4, 5 ] undefined */

// map 遍历，返回一个新的数组,（不管有没有返回值），不能break
var b = a.map((value, index, arr)=>{
    // if(index === 3){ break;}  // 报错
    console.log(index);
    // if(index === 3){
    //     throw new Error('break');
    // }
       if(value>1){
           return value+1
       }             // 1 没有return时， b = [ undefined, undefined, undefined, undefined, undefined ]
    //return value+1; // 2 有return时返回return的值，b= [ 2, 3, 4, 5, 6 ]

});
console.log(a , b); //[ 1, 2, 3, 4, 5 ] [ undefined, undefined, undefined, undefined, undefined ] 

// filter 遍历， 返回符合条件的值到新数组, 如果都不符合条件为空数组[]， 也就是回掉函数结果返回true才会插入到新数组
// 返回的是原数组的值
/* var b = a.filter((value, index, arr)=>{
    // 1. 没有返回值 b=[]
    
    // 2. 
    // return 1; // b = [ 1, 2, 3, 4, 5 ]
    // return 0;  //b = []

    // 3 
    if(value>1){
        return value+1
    }
    //  return value>1; //[ 2, 3, 4, 5 ] // value>1 为true时才会插入到新数组

});
console.log(a,b);  */
// forEach map filter 都不能break
// map filter 会返回一个新的数组

/*  总结： 都可以遍历， 原数组都不会发生改变
forEach map filter some every 都不能break
forEach 单纯的遍历数组， 没有返回值undefined
map： 返回新数组，将回掉函数的返回结果插入到新函数
filter 返回新数组，回掉函数返回true时，将原数组的值插入到新数组 
*/

// 返回一个布尔值, 遍历的回掉返回值都为true时才返回true, 否则返回false, 自动中途就会停止循环

/* var b  = a.every((value, index,arr)=>{
    console.log(value);
    return value>6;
});
console.log(a, b);  */
// 1
// [ 1, 2, 3, 4, 5 ] false 



// 和every 相反，会一直遍历，直到有一个回掉返回true，就会终止循环返回true
/* a = [1,2,3,4,5,6];
var b = a.some((value, index,arr)=>{
    console.log(value);
    return value>2;
});
console.log(a, b); */

/*以上返回如下：
1
2
3
[ 1, 2, 3, 4, 5 ] true
 */ 

 // 把每一次回掉函数的返回值，作为下一次的prev,  最后返回最总结果
 // 可以理解为迭代器，可以用户求和，求乘积等等
 // ps： 如果没有默认initValue, 那么第一次的prev是数组的第一个值，从第二次开始循环，数组少循环一次
 
 // 求和， 求乘积
/*  a = [1,2,3,4,5];
 var b = a.reduce((prev,cur, curIndex, arr)=>{
    //  console.log(prev, cur, curIndex, arr);
    //  return cur;
    return prev+cur;
 },0);
 console.log(a, b); */

 /* 以上输出结果：
[ 1, 2, 3, 4, 5 ] 15
 */

 //reduce 高级用法
 //1 计算数组中每个元素出现的次数
/*  var a2 = ['daya', 'daya2','daya3', 'daya', "daya2"];
 var b = a2.reduce((prev, cur, curIndex,arr)=>{
    if(cur in prev){
        prev[cur]++
    }else{
        prev[cur] = 1;
    }
    return prev;
 },{});
 console.log(b); //{ daya: 2, daya2: 2, daya3: 1 } */

 // 2. 数组去重
/*  
var b = a2.reduce((prev, cur, curIndex)=>{
    if(prev.includes(cur)){
        return prev;
    }else{
        return prev.concat(cur);
    }
},[]);
console.log(a, b) //[ 1, 2, 3, 4, 5 ] [ 'daya', 'daya2', 'daya3' ]
 */
// 3.将二维数组转化为一维
/* 
var a3 = [0,[1,2],[3,4],[5],[6,7]];
var b = a3.reduce((prev, cur, curIndex, arr)=>{
    return prev.concat(cur);
},[]);
console.log(b); //[0, 1, 2, 3, 4, 5, 6, 7 ]
 */
// 4. 多维数组转化为一维数组
/* 
var a4  = [0,[1,2],[3,4,[31,32,[33,34]]],[5],[6,7]];
var newArr = function(arr){
  return  arr.reduce((prev, cur)=>{
    return prev.concat(Array.isArray(cur)? newArr(cur): cur);
}, [])
};
var b = newArr(a4);
console.log(b); //[ 0, 1, 2, 3, 4, 31, 32, 33, 34, 5, 6, 7 ]
 */

 // 5.数组对象里的属性求和
 /* 
 var a5 = [
     {
         subject:'math',
         score: 30
     },
     {
        subject:'chinese',
        score: 90
     },
     {
        subject:'english',
        score: 60
     }
    ]
 var b = a5.reduce((prev, cur, index)=>{
     return prev + cur.score;
 },0);
 console.log(b); // 180
 */

// 求最大值value，和最大值的index
/* a = [-1,-2,-3,-4,5,-6]
let b = a.reduce((obj, cur, index)=>{
    if(!obj.value || obj.value < cur){
       obj = {value:cur, index:index};
    }
    return obj;
}, {});
console.log(b); //{ value: 5, index: 4 } */

//  总结：
// reduce可以实现求和求乘积， 求出现的次数，去重，将多维数组转化为一维，对象里的属性求和,求最大最小值

// 最大值
// a= [1,2,3,10];
// 1）
/* a.sort((a,b)=>{
    return b-a;
});
console.log(a[0]);  // 9 */
// 2
/* let max = Math.max(...a);
console.log(max); // 9 */
// 3 reduce 
// 4 传统的循环相邻比较交换
/* function max(arr){
    let n= arr[0]
    for(let i=1, len = arr.length; i<len; i++){
      n = Math.max(n, arr[i])
    }
    console.log(n);
    return n;
}
max(a); */

