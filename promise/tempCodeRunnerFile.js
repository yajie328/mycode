let p = new Promise((resolve,reject)=>{
    reject(123)
}).then(data=>{
    console.log(1)
}).catch((data)=>{
    console.log()
})