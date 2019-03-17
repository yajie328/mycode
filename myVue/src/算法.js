//1. 生成一个长度15的数组list, 每个元素值为1-100的随机整数（最好不使用for循环）
/* let list = [];
var i = 0;
do{ 
    list.push(Math.floor(Math.random()*(100-1)+1));
    i++;
}while(i<15)
console.log(list); */

//2. 打乱list中各元素顺序，并计算前10个元素的总和
// 
// const list = [5, 8, 30, 34, 36, 42, 51, 56, 58, 61, 64, 66, 76, 89, 89]

// list.sort(function(a,b){
//     return Math.random()-0.5
// })
/* var i = list.length;
while(i){
    var j = parseInt(Math.random()*i--);
    [list[i], list[j]] = [list[j], list[i]];
}
console.log(list);
var list2 = list.slice(0,10);
console.log(list2);
let sum = list.reduce((pre, cur, curIndex)=>{
    if(curIndex>9){
        return pre;
    }else{
        return pre+cur;
    }
},0);
console.log(sum); */


//3. 去处list中的重复项
const list = [1,2,2,3,2,5,3,8,0];
// console.log(list);
let newList = list.reduce((prev, next, curIndex,arr)=>{
    console.log(prev, curIndex);
    if(prev.includes(next)){
        return prev;
    }else{
         return prev.concat(next); //1.
        /* prev.push(next); // 2.
        return prev; */
    }
},[]);
console.log(newList);