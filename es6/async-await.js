let fs = require('mz/fs');
async function read(){
    let name = await fs.readFile('./promise/name.txt','utf8');
    let age  = await fs.readFile("./promise/"+name, 'utf-8');
    let e = await [age];
    return e;
}
read().then(data=>{
    console.log(data);
})
// let fs = require('fs');
// fs.readFile('./promise/name.txt','utf8',function(err,data){
//     console.log(data);
// });
