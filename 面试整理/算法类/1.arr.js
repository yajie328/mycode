// 把数组 ['a','b',[1,2,[3,4]],'c',['d']] 通过flat(arr) 转成 a,b,1,2,3,4,c, d

let arr = ['a','b',[1,2,[3,4]],'c',['d']];
// 1.通过递归
function flat(array){
    let result = [];
    
    function loop(arr){
        for(let i=0; i<arr.length; i++){
            if(arr[i] instanceof Array){
                loop(arr[i]);
            }else{
                result.push(arr[i])
            }
        }
    }
    loop(array);
    return result.join(';');
}
// 数组转字符串都是先调用valueOf  然后在toString
// 2. valueof // 有局限性
function flat2(arr){
    let valueOf = Array.prototype.valueOf;
    Array.prototype.valueOf = function(){
        return this.join(';')
    } 
    
    let result = arr +'';
    Array.prototype.valueof = valueOf;
    return result;
}

// 3. toString 
function flat3(arr){
    let toString = Array.prototype.toString;
    
    Array.prototype.toString = function(){
        return this.join(';')
    } 
    
    let result = arr +'';
    Array.prototype.toString = toString;
    return result;
}



// 4. [Symbol.iterator]
Array.prototype[Symbol.iterator] = function(){
    let arr = [].concat(this);
    let getFitst = function(array){
        let first = array.shift();
        return first;
    }
    return {
        next: function(){
            let item = getFitst(arr);
            if(item){
                return {
                    value: item,
                    done: false
                }
            }else{
                return {
                    done: true
                }
            }
        }

    }
}

let flat4 = function(arr){
    let result = [];
    for(let i of arr){
        console.log(i)
        result.push(i);
    }
    return result.join(';');
}

console.log(flat4(arr)); // a,b,1,2,3,4,c,d
