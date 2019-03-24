// 迭代器: 1有一个next方法，2每次调用后都会返回value,done 两个属性
//1 原始方法
let obj = {0:1, 1:2, 2:3,length:3,[Symbol.iterator]:function(){

    let self = this;
    let index = 0;    
    return { // 迭代器
            next(){
                return {value:self[index], done:index++ === self.length};
            }
        }
    }
}

// 2：用generate
let obj = {0:1, 1:2, 2:3,length:3,[Symbol.iterator]:function* (){
    // 每次浏览器都会不停的调用next方法 把yield的结果作为值
    let index = 0;
    while(index !== this.length){
        yield this[index++];
    }
    }
}

function arg(){
    let arr = [...obj];
    console.log(arr); 
}
arg(1,2,3,4,5); //[ 1, 2, 3 ]

// *  generator可以生成一个迭代器，可以调用next()可以返回value和done
function* read(){ // 生成器会配合yield来使用
    yield 1;
    yield 2;
    yield 3;
}
let r = read();
console.log(r.next()); //Object [Generator] {}
// next走一次 碰到yield就停了
console.log(r.next());
console.log(r.next());
console.log(r.next());
/* 
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true } 
*/

function* read2(){ // 生成器会配合yield来使用
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
}
let r2 = read2();
console.log(r2.next()); // 第一次next不能传递参数的
console.log(r2.next(100));
console.log(r2.next(200));
console.log(r2.next(300)); 

