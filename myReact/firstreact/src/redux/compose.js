//
export default function compose(...fns){
    if(fns.length===0){
        return args=>args;
    }
    if(fns.length == 1){
        return fns[0]
    }else{
        return fns.reduce((a,b)=>((...args)=>a(b(...args))));
    }
    
}

/* function a(str){
    console.log(2)
    return 1+str;
}
function b(str){
    console.log(2)
    return 2+str;
}
function c(str){
    console.log(3)
    return 3+str
}

console.log(compose(a,b,c)('daya'))
// 实现compose 
function compose(...fns){
    return fns.reduce((a,b)=>((...args)=>a(b(...args))))
} */