let fs = require('fs');
let Events = require('events');
// 第一次向文件中写入， 第二次把内容放到缓存 第一次写入成功后 情况缓存第一项清空后 再清空第二个，都清空后子再看是否触发drain事件
class WriteStream extends Events{
    constructor(path, options){
        super();
        this.path = path;
        this.flags =  options.flags || 'w';
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose || true;
        this.encoding = this.encoding || 'utf8';
        this.highWaterMark = options.highWaterMark || 16*1024;
        this.start = options.start || 0;

        this.open();

        // 链表 js中可以用对象 模拟链表
        // {head: 1, chund: 'xxx', tail:2} - {head:2, chund: 'xxx', tail:3}
        this.cache = []; // 存放多次写入的数据
        

        // 维护写入的长度 len
        this.len = 0; 

        // 是否触发drain事件
        this.needDrain = false;

        // 如果正在写入就放到缓存中
        this.writing = false;

        // 维护写入的位置
        this.pos = this.start;
    }
    open(){
        fs.open(this.path, this.flags, (err, fd)=>{
            if(err){
                return this.emit('error');
            }

            this.fd = fd;
            this.emit('open');
        })
    }
    write(chunk, encoding=this.encoding, callback=()=>{}){
        // 第一次真正的像文件中写入，之后放到内存中了
        // 把写入的内容同意转化成buffer
        chunk = Buffer.isBuffer(chunk)? chunk: Buffer.from(chunk);
        this.len += chunk.length;
        if(this.len >= this.highWaterMark){ // 清空后需要触发drain事件
            this.needDrain =  true;
        }

        if(this.writing){
            this.cache.push({
                chunk, 
                encoding, 
                callback
            })
        }else{
            this.writing = true;
            this._write(chunk, encoding,()=>{
                callback();
                this.clearBuffer();// 清理数组的第一项
            });
        }

        // write方法返回一个结果
        return !this.needDrain;
    }
    _write(chunk, encoding, callback){
       if(typeof this.fd !== 'number'){
           return this.once('open',()=>this._write(chunk,encoding,callback));
       }
       fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err,written)=>{
            this.pos += written;
            this.len -= written;
            callback(); // 写入成功后会执行cllback, 会执行clearBuffer的方法

       });
    }
    clearBuffer(){
        let obj = this.cache.shift();
        if(obj){
            this._write(obj.chunk, obj.encoding,()=>{
                // 当自己写入成功后 继续清空缓存 直到缓存区为空
                obj.callback();
                this.clearBuffer();
            })
        }else{ // 缓存已经干了
            if(this.needDrain){
                this.needDrain = false;
                this.writing = false; // 不是正在写入，下次写入依然往文件中写，剩下的放缓存
                this.emit('drain');
            }

        }
    }
    end(){
        
    }
}

module.exports = WriteStream;