let Koa = require('koa');
// let fs = require('fs');
let fs = require('mz/fs');
let path = require('path');
let mime = require('mime');
let static =  require('koa-static');
// let bodyParser = require('koa-bodyparser');
let formidable = require('formidable');

let app = new Koa();

// function static(dir){
//     return async (ctx, next)=>{
//         try{
//             let requestUrl = ctx.path;  
//             let absPath =  path.join(dir, requestUrl);
//             let statObj = await fs.stat(absPath);
//             if(statObj.isDirectory()){
//                 // 文件夹的处理
//                 absPath = path.join(absPath,'index.html');
//             }
//             ctx.set('Content-Type',mime.getType(absPath)+';charset=utf8');
//             ctx.body = fs.createReadStream(absPath);
//         }catch(e){
//             console.log(e);
//             await next();
//         }
//     }
// }


// app.use(async(ctx, next)=>{
//     if(ctx.path === '/1.form.html'){
//         ctx.set('Content-Type', 'text/html');
//         ctx.body = fs.createReadStream('./1.form.html');
//     }else{
//         await next();
//     }
// })

// function bodyParser(ctx){
//     return new Promise((resolve, reject)=>{
//         let arr = [];
//         ctx.req.on('data', function(chunk){
//             console.log(chunk);
//             arr.push(chunk);
//         })

//         ctx.req.on('end', function(){
//             let qs = require('querystring').parse(Buffer.concat(arr).toString());
//             resolve(qs);
//         })
//     })
// }


// function bodyParser(){
//     return async (ctx, next)=>{
//         await new Promise((resolve, reject)=>{ // 只要koa中有异步代码 那他就是一个promise
//             let arr = [];
//             ctx.req.on('data', function(chunk){
//                 arr.push(chunk);
//             })
    
//             ctx.req.on('end', function(){
//                 // console.log(Buffer.concat(arr).toString())
//                 if(ctx.get('content-type') == 'application/x-www-form-urlencoded'){
//                     ctx.request.body = require('querystring').parse(Buffer.concat(arr).toString());
//                 }else if(ctx.get('content-type') === 'application/json'){
//                     ctx.request.body = JSON.parse(Buffer.concat(arr).toString());
//                 }else{
//                     ctx.request.body = {};
//                 }
//                 resolve();
//             })
//         })
//         await next();
//     }
// }
let total;
let filename;
let i = 0;
async function parser(form,req){
    return new Promise((resolve, reject)=>{
        form.parse(req, async function(err, fields, files){
            total =  fields.count;
            filename = fields.filename;
            await fs.rename(files.chunk.path, 'temp/'+fields.chunkNum);
        });
    
        form.on('end', function() {
            if(++i == total){
                resolve(filename);
            }else{
                resolve(false)
            }
        });
    })
}

async function mergeFiles(){
    let dirs = await fs.readdir('./temp');
    dirs.sort((a,b)=>a-b);
    dirs = dirs.map(dir=>path.join('temp',dir));
   let ws =  fs.createWriteStream(filename);
   for(let i=0; i<dirs.length;i++){
       ws.write(fs.readFileSync(dirs[i]));
   }
   ws.end();
} 
// app.use(bodyParser()); 
app.use(static(__dirname)); // koa 中间件 和express写法一样，
app.use(async(ctx, next)=>{ 
    if(ctx.path === '/upload' && ctx.method === 'POST'){
       ctx.body =  ctx.request.body;
    }else if(ctx.path === '/uploadfile' && ctx.method === 'POST'){ // 分片上传
        let form = new formidable.IncomingForm();
        form.uploadDir = "temp";
        let filename = await parser(form, ctx.req);
        if(!filename){
            ctx.body = '当前数据块上传成功';
        }else{
            await mergeFiles(filename);
            ctx.body = '全部上传成功';
        }
    }else{
        await next();
    }
})

app.listen(3000,'localhost', function(){
    console.log('server start 3000....')
})


