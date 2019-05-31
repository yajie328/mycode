let Promise = require('./promise_es6');
let p = new Promise(function(resolve, reject){
    reject(456)
});
p.then().then().then(data=>{
    console.log(data);
}, err=>{
    console.log(err);
})



