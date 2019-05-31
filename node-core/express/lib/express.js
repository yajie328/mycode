const http = require('http');
const url = require('url');

let route = [
    {
        path: '*',
        methed: '*',
        handler: (req, res)=>{
            res.end(`Cannot ${req.method} ${req.url}`);
        }
    }
]
let method = ['get', 'post', 'put', 'options','delete'];
const createApplication =  function(){
    return {
        get(path, handler){
            route.push(
                {path, 
                method:'get', 
                handler
            })
        },
        methedInit(){
            method.forEach((type)=>{
                route.push({
                    path: path,
                    handler: handler,
                    method: type
                })
            })
        },
        listen(){
            let server = http.createServer((req,res)=>{
                let {pathname} = url.parse(req.url, true);
                for(let i=1; i<route.length; i++){
                    let {path, method, handler} = route[i];
                    if(pathname == path && method == req.method.toLowerCase()){
                        return handler(req, res);
                    }
                }
                route[0].handler(req, res);
            })
            server.listen.apply(server, arguments);
        }
    }
}
module.exports = createApplication;