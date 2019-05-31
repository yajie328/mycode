const fs = require('fs');
fs.readFile("./promise/age.txt",()=>{
    setTimeout(()=>{
        console.log('timeout');
    },0);
    setImmediate(()=>{
        console.log('immediate');
    })
})