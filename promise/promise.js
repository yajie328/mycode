let p = new Promise(function(resolve, reject){
    resolve('123');
});
let p2 = p.then((data)=>{
    console.log(data);
},(err1)=>{
    console.log(err1);
    return err1;
})
let p3 = p2.then(data2=>{
    console.log(data2);
},(err2)=>{
    console.log(err2);
});
p3.then(data3=>{
    console.log(data3);
});
