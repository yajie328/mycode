let fs = require('fs');
let EventEmitter = require('events');

class ReadStream extends EventEmitter{
    constructor(path, options){
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.mode = options.mode || '438';
        this.start = options.start || 0;
        this.end =  options.end;
        this.autoClose = options.autoClose || true;
        this.highWaterMark =  options.highWaterMark || 64*1024
        this.encoding = options.encoding || null;
        // 默认非流动模式 re.pause rs.resume
        this.flowimg =  null; // 开始读取时需要把这个值改为true

        // 记录是否读取完毕, 默认false
        this.completed = false; 

        // 要读取文件 需要打开文件,默认打开
        this.open();

        this.on('newListener',(type)=>{
            if(type === 'data'){
                // 用户监听了data事件
                this.flowing = true; // 开始读取
                this.read();
            }
        })

        // 每次读取的位置
        this.pos = this.start; // 默认等于开始位置
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                this.emit('error');
            }
            this.fd = fd; // 代表当前文件的描述符 rs.read()
            this.emit('open', this.id);
        })

    }
    read(){
        // 默认第一次 read方法拿不到fd, 触发了open事件后 肯定可以获取到this.fd
        if( typeof this.fd !== 'number'){ // 保证文件描述符存在，才调用read方法
            return this.once('open',()=>this.read());
        }
        // highWaterMark 每次读取的个数
        // 如果没有end， 每次读取highWathMark  如果有end 那就需要算最小值
        let howMuchToRead = this.end? Math.min((this.end - this.pos + 1), this.highWaterMark) :this.highWaterMark;
        let buffer =  Buffer.alloc(howMuchToRead);
        fs.read(this.fd, buffer, 0, buffer.length, this.pos,(err, bytesRead)=>{
            if(bytesRead >0){ // 能读取到内容， 而且flowing为true，就继续读取
                this.pos += bytesRead; // 维护每次读取的位置
                console.log(this.encoding? buffer.slice(0, bytesRead).toString(this.encoding) : buffer.slice(0, bytesRead))
                this.emit('data', this.encoding? buffer.slice(0, bytesRead).toString(this.encoding) : buffer.slice(0, bytesRead));
                if(this.flowing){
                    this.read();
                }
            }else{
                this.completed = true;
                this.emit('end');
                if(this.autoClose){
                    fs.close(this.fd,()=>{
                        this.emit('close');
                        this.flowing = null;
                    })
                }
            }

        })
    }
    pause(){
        if(!this.completed){ // 没有读取完毕的情况下暂停和继续才有意义
            this.flowing = null;
        }
    }
    resume(){
        if(!this.completed){
            this.flowing = true;
            this.read();
        }
    }

    pipe(ws){
        this.on('data',(chunk)=>{
            let flag = ws.write(chunk);
            if(!flag){
                this.pause();
            }
        });

        ws.on('drain', ()=>{
            this.resume();
        })
    }
}


module.exports =  ReadStream;


