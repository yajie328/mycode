let express = require('express');
let bodyParser = require('body-parser');
let app =  express();
app.use('/user',function(req, res, next){
    console.log(req.url, req.method);
    next();
})
app.all("*",function(req,res,next){
    // res.send("404");
    console.log('all');
    next();
   })
app.get('/', function(req,res,next){
    // res.end('hello');
    console.log(1);
    next();
})
app.get('/user', function(req,res){
    console.log('user')
})
app.listen(3000, function(req, res){
    console.log('server start');
})
