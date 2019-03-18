// 发布订阅模式
var fs = require('fs');
function myEmit(){
    this._arr = [];
}
myEmit.prototype.on = function(callback){
    this._arr.push(callback);
};
myEmit.prototype.emmit = function(){
    this._arr.forEach((fn)=>fn.apply(this,arguments));
}
var e =  new myEmit();
e.on(function(){
    console.log(arguments[0], arguments[1]);
    console.log('爸爸给你食物')
})
e.on(function(){
    console.log('妈妈给你食物')
})
e.emmit('饿了', '宝宝饿了');
var arr = [];
e.on(function(data){
    arr.push(data);
    if(arr.length == 2){
        console.log(arr);
    }
})
 fs.readFile('./json/age.json','utf-8', function(err,data){
    e.emmit(JSON.parse(data),'age');
 });
 fs.readFile('./json/name.json','utf-8', function(err,data){
    e.emmit(JSON.parse(data),'name');
 });