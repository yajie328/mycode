let http = require('http')
let url = require('url')
let fs = require('fs');

let sliders = require('./sliders.js')

function read(cb) {
    fs.readFile('./books.json', 'utf8', function (err, data) {
        if (err || data.length === 0) {
          cb([])
        } else {
          cb(JSON.parse(data));
        }
    })
}
function write(data,cb) {
    fs.writeFile('./books.json', JSON.stringify(data), cb)
}

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT,POST, OPTIONS,DELETE')
    res.setHeader('Access-Control-Max-age', 10)
    let method = req.method.toLowerCase();
    if (method === 'options') return res.end()

    let {pathname,query} = url.parse(req.url, true)
    // 轮播图
    if (pathname === '/sliders') {
        res.setHeader('Content-type', 'application/json; charset=utf8')
        res.end(JSON.stringify(sliders))
    }
    // 热门图书
    if (pathname === '/hot') {
        read((books) => {
          let hot = books.slice(0,6);
          res.setHeader('Content-type', 'application/json; charset=utf8')
          res.end(JSON.stringify(hot)); 
        })
    }
    // 删除图书 resuful风格接口
    if(pathname === '/book'){
      let id = query.id; 
      res.setHeader('Content-type', 'application/json; charset=utf8')
      switch(method){
        case 'get':
            if(id){
              read((books)=>{
                let book = books.find(book=>{
                  if(book.bookId == id){
                    return book;
                  }
                });
                book = book? book: {};
                res.end(JSON.stringify(book));
              })
            }else{ 
              read((books) => {
                res.end(JSON.stringify(books.reverse())); 
              })
            }
            break;
        case 'post': //添加一本书
            let str = '';
            req.on('data', chunk=>{
                str +=chunk;
            })
            req.on('end', function(){
                let book = JSON.parse(str);
                    read(function(books){
                        book.bookId = books.length?books[books.length-1].bookId+1 :1;
                        books.push(book);
                        write(books, function(){
                            res.end(JSON.stringify(books));
                        })
                    })
            })
            break;
        case 'delete': // 删除
            read((books) => {
              books = books.filter(item=>item.bookId != id);
              write(books, function(err){
                  if(err) console.log(err);
                  res.end(JSON.stringify(books)); 
              })
            })
            break;
        case 'put': // 修改
            if(id){
                let str = '';
                req.on('data', chunk=>{
                    str +=chunk;
                });
                req.on('end', function(){
                    let book = JSON.parse(str); // 这本书
                   read(books=>{
                        books = books.map(item=>{
                            if(item.bookId == id){
                                return book;
                            }
                            return item;
                        })
                       write(books, function(err){
                            if(err) console.log(err);
                            res.end(JSON.stringify(book));
                        })
                    })
                    
                })
                
            }
            break;
      }
    }
}).listen(3000, function(){
  console.log('server start 3000')
})
