"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = 'a';
var b;
b = 'b';
b = true;
function fn(name) {
    console.log('hello', name);
}
fn('daya');
function fn2() {
    while (true) {
    }
}
function fn3() {
}
function fn4(name) {
    return undefined;
}
fn4(3);
null == undefined;
var c = 'hello';
// c = 2;
var falg = false;
var age = 10;
var arr = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = ['1', '2', '3'];
// 元祖类型tuple
var daya = ['zhufeng', 3];
var len = daya[0].length;
var num = daya[1].toFixed(2);
var animal = ['daya', 10, true];
// 枚举类型enum
var Genger;
(function (Genger) {
    Genger[Genger["man"] = 0] = "man";
    Genger[Genger["woman"] = 1] = "woman";
})(Genger || (Genger = {}));
console.log(Genger.man); //0
console.log(Genger.woman); //1
console.log(Genger[0], Genger[1]); //man woman
var Week;
(function (Week) {
    Week[Week["monday"] = 1] = "monday";
    Week[Week["tuesday"] = 2] = "tuesday";
})(Week || (Week = {}));
console.log(Week.monday);
var myColors = [0 /* red */, 1 /* yellow */, "blue" /* green */.length];
//任意类型 (any)
// let root:any = document.getElementById('root');
// root.style.color="red";
// let root1:(HTMLElement|null) =document.getElementById('root');
// root!.style.color ='red';
// null undefined
var x;
x = 1;
x = undefined;
x = null;
function fn5(x) {
    if (typeof x === 'string') {
    }
    else if (typeof x === 'number') {
    }
    else {
        // never类型
    }
}
console.log('daya'.toUpperCase());
console.log(new String('zhufeng').toUpperCase());
var isOk = true;
var isOk2 = Boolean(1);
var t1 = 1;
var t2 = 'one';
var t3 = true;
// 函数可选参数
function print(name, age) {
    console.log(name);
}
print('daya');
// 剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (preV, currV) { return preV += currV; }, 0);
}
console.log(sum(1, 2, 3));
// 函数重载
var obj = {};
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    else {
        obj.age = val;
    }
}
attr('daya');
attr(18);
// attr(true);
console.log(obj);
// 类
var Person = /** @class */ (function () {
    function Person(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, money, no) {
        var _this = _super.call(this, name, age, money) || this;
        _this.no = no;
        return _this;
    }
    Student.prototype.docs = function () {
        console.log(this.name + " " + this.age + " " + this.money);
    };
    Student.prototype.getNo = function () {
        return this.no;
    };
    return Student;
}(Person));
var child = new Student('daya', 18, 1000, 200);
console.log(child.name);
// console.log(child.age);  // 提示错误
// console.log(child.money); // 提示错误
console.log(child.no);
// readonly
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.changeName = function (name) {
        this.name = name; //提示错误
        console.log(this.name);
    };
    return Animal;
}());
var an = new Animal('daya');
an.changeName('daya2');
// staic
var Father = /** @class */ (function () {
    function Father(name) {
        this.name = name;
    }
    Father.getClassName = function () {
        return Father.className;
    };
    Father.className = 'father';
    return Father;
}());
console.log(Father.className);
console.log(Father.getClassName());
