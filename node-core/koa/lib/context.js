let ctx = {};

function defineGetter(property, key){
    ctx.__defineGetter__(key, function(){
        return this[property][key];
    })
}
function defineSetter(property, key){
    ctx.__defineSetter__(key, function(v){
        this[property][key] =  v;
    })
}

defineGetter('request', "url");
defineGetter('request', "path");
defineGetter('response', "body");
defineSetter('response', "body");



module.exports = ctx;

// this.req
// ctx.__defineGetter__('url', function(){
//     return this.req['url'];
// });
// let obj = {
//     a:100
// }
// // obj.a
// let newObj = {}
// newObj.__defineGetter__('a', function(){
//     return obj['a'];
// })
// console.log(newObj.a);