#!/usr/bin/env node

// 默认启动一个http-server port ip地址

let config = {
    port: 3000,
    host: "127.0.0.1",
    dir: process.cwd() // 在哪里启动路径指向哪里
}

// process.argv.slice(2)
// yargs 解析参数 comander
let commander = require('commander');
let json = require("../package.json");

commander.version(json.version)
    .usage('dy-http-server [options] ')
    .option("-p, --port <n>",'set http-server port')
    .option('-o, --host <n>',"set http-server host")
    .option('-d, --dir ,<n>', "set http-server directory")
    .on('--help', function(){
        console.log('  Examples')
        console.log('  $ dy-http-server --port --host')
    })
    .parse(process.argv);

    // console.log(commander.port, commander.host, commander.dir);
    config = {...config, ...commander}
   
    let Server = require("../server.js");
    let server = new Server(config);
    server.start(); // 启动一个服务













// console.log('hello');
