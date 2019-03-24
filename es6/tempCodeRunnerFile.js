Array.prototype.reduce = function(callback,prev){
    for(let i=0; i<this.length; i++){
        // if(prev){
        //     prev =  callback(prev, this[i], i, this);
        // }else{ // 如果没定义， prev = this[0];
        //     prev = callback(this[i],this[i+1], i+1, this);
        //     i++;
        // }
        if(prev == undefined && i == 0){
            prev = this[0];
            i++;
        }
        prev = callback(prev, this[i], i, this);
           
    }
    return prev;
};

let a = [1,2,3].reduce((prev, cur)=>{
    return prev+cur;
},100);
console.log(a);