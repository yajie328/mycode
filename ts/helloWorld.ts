let a:string ='a'

let b:string|boolean;
b = 'b';
b = true

function fn(name:string):void{
    console.log('hello', name)
}
fn('daya')

function fn2():never{
    while(true){

    }
}

function fn3():void|never{

}
function fn4(name:string|number):void{
    return undefined;
}
fn4(3)

null == undefined;
let c = 'hello';
// c = 2;

let falg:boolean = false;
let age: number =10;
let arr:number[] = [1,2,3];
let arr2:Array<number> = [4,5,6];
let arr3: string[] = ['1','2','3']

// 元祖类型tuple
let daya:[string, number] = ['zhufeng',3]
let len = daya[0].length;
let num = daya[1].toFixed(2);
const animal:[string, number, boolean] = ['daya',10, true];

// 枚举类型enum
enum Genger{
    man,
    woman
}
console.log(Genger.man); //0
console.log(Genger.woman); //1
console.log(Genger[0], Genger[1]); //man woman
enum Week{
    monday=1,
    tuesday=2
}
console.log(Week.monday);

const enum Colors{
    red,
    yellow,
    green="blue"
}
let myColors =[Colors.red, Colors.yellow,Colors.green.length]

//任意类型 (any)
// let root:any = document.getElementById('root');
// root.style.color="red";

// let root1:(HTMLElement|null) =document.getElementById('root');
// root!.style.color ='red';

// null undefined
let x:number| null |undefined;
x =1;
x = undefined 
x = null

function fn5(x:number|string){
    if(typeof x ==='string'){

    }else if(typeof x ==='number'){

    }else{
        // never类型
    }
}

console.log('daya'.toUpperCase());
console.log(new String('zhufeng').toUpperCase())

let isOk:boolean = true;
let isOk2:boolean =Boolean(1);
// let isOk3:boolean = new Boolean(1);

// 字面量类型
type Ztype = 1|'one'|true;
let t1:Ztype = 1;
let t2:Ztype = 'one'
let t3:Ztype = true;

// 函数可选参数
function print(name:string,age?:number):void{
    console.log(name)
}
print('daya');
// 剩余参数
function sum(...numbers:number[]){
    return numbers.reduce((preV,currV)=>preV+=currV,0);
}
console.log(sum(1,2,3))

// 函数重载
let obj: any ={}
function attr(val: string):void;
function attr(val: number):void;
function attr(val:any):void{
    if(typeof val ==='string'){
        obj.name = val;
    }else{
        obj.age = val;
    }
}
attr('daya')
attr(18)
// attr(true);
console.log(obj);

// 类
class Person {
    public name:string; // 类 子类 实例都可以访问
    protected age:number; // 类 子类 能访问 外面不能访问 
    private money:number; // 只能类里面访问
    constructor(name:string, age:number, money:number){
        this.name = name;
        this.age = age;
        this.money = money;
    }
    getName():string{
        return this.name;
    }
    setName(name:string){
        this.name = name;
    }
}
class Student extends Person{
    public no:number;
    constructor(name:string,age:number, money:number, no:number){
        super(name,age,money);
        this.no = no;
    }
    docs(){
        console.log(`${this.name} ${this.age} ${this.money}`)
    }
    getNo():number{
        return this.no
    }
}

let child = new Student('daya', 18, 1000,200);
console.log(child.name);
// console.log(child.age);  // 提示错误
// console.log(child.money); // 提示错误
console.log(child.no)

// readonly
class Animal{
    public readonly name:string;
    constructor(name:string){
        this.name = name;
    }
    changeName(name:string){
        this.name = name; //提示错误
        console.log(this.name)
    }
}
let an = new Animal('daya');
an.changeName('daya2');

// staic
class Father{
    static className ='father';
    static getClassName(){
        return Father.className;
    }
    public name:string;
    constructor(name:string){
        this.name = name;
    }
}
console.log(Father.className);
console.log(Father.getClassName())