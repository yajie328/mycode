
let app ={};
let middleRoute = [];
app.use = function(callback){
    middleRoute.push(callback);
}

app.use(function(next){
    console.log(1);
    next();
    console.log(2);
})
app.use((next)=>{
    console.log(3);
    next();
    console.log(4);
})
app.use((next)=>{
    console.log(5)
    next();
    console.log(6);
})

// 1)
// function dispatch(index){
//     if(index ==  middleRoute.length) return ()=>{};
    
//     let route = middleRoute[index];
//     route(() => dispatch(index+1));
// }
// dispatch(0);

// 2)
// f3> f2>f1
// let fn = middleRoute.reduceRight((pre, cur, index)=>{console.log(index); return ()=>{cur(pre)}},()=>{})
// fn();

3)
// let fn = middleRoute.reduce((pre, cur)=>{
//    return function(...args){
//        return pre(()=>cur(...args))
//    }
// });
// fn(()=>{});