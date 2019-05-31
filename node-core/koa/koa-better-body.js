let Koa = require('koa');
let fs = require('mz/fs');
let path =  require('path');
let convert = require('koa-convert');
let Router = require('koa-router');
// let betterbody = require("koa-better-body")

let app = new Koa();
let router = new Router();
Buffer.prototype.split = function(sep){
    let arr = [];
    let offset = 0;
    let len = Buffer.from(sep).length;
    let current;
    while(-1 !== (current = this.indexOf(sep,offset))){
        arr.push(this.slice(offset,current));
        offset = current + len;
    }
    arr.push(this.slice(offset));
    return arr;
}
function betterbody({uploadDir}){
    return async (ctx, next)=>{
        await new Promise((resolve, reject)=>{
            let arr = [];
            ctx.req.on('data', function(data){
                arr.push(data);
            })
            ctx.req.on('end', function(){
                if(ctx.get('content-type').includes('multipart/form-data')){
                    let r = Buffer.concat(arr);
                    let bounary = '--'+ctx.get('content-type').split('=')[1];
                    let lines = r.split(bounary).slice(1,-1);
                    let fields = {};
                    lines.forEach((line)=>{
                        let [head1,body] = line.split('\r\n\r\n');
                        body = body.slice(0,-2); // 取出内容区域有效的内容
                        head = head1.toString(); // 标题转化成字符串
                        if(head.includes('filename')){
                            // 处理文件 总共的内容 减去 头部的长度 - 4就是剩下的请求体
                           let filecontent = line.slice(head.length + 4,-2);
                           let fileNames = head.match(/filename="([\w|.|-]*)"/);
                           let filename = fileNames[1];
                           if(filename){
                               fs.writeFileSync(path.join(uploadDir, filename),filecontent);
                           }
                        }else{
                            fields[head.match(/name="(\w+)"/)[1]] = body.toString();
                        }
                    })
                    ctx.request.fields = fields;
                }
                resolve();
            })
           
        })
        await next();
    }

}
app.use(betterbody({
    uploadDir: 'temp'  // 上传路径
}))


router.get('/1.form.html', async (ctx,next)=>{
    let abspath = path.join(__dirname, ctx.path);
    ctx.set('Content-Type', 'text/html; chartset=urf8')
    ctx.body = fs.createReadStream(abspath);
    
})

router.post('/upload', async (ctx, next)=>{ 
    // console.log(JSON.parse(ctx.request).fields[0].path));
    // let files = ctx.request.fields.files;
    // for(let i=0; i<files.length; i++){
    //     await fs.rename(ctx.request.fields.files[i].path, 'temp/'+ ctx.request.fields.files[i].name);
    // }
    ctx.body = ctx.request.fields;
})
// app.use(async (ctx, next)=>{
//     ctx.body = 'daya';
// })
app.use(router.routes());
app.listen(3000,'localhost', function(){
    console.log('server start 3000....')
})


