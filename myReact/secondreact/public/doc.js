let pathToRegexp = require("path-to-regexp")
let keys = []
const regexp = pathToRegexp('/foo/:id/:name', keys, {end: true})
keys = keys.map(key=>key.name); //[ 'id', 'name' ]
let pathname = "/foo/300/daya"
let [url, ...values] = pathname.match(regexp);
console.log(values); //[ '300', 'daya' ]

let params = {}
for(let i=0; i<keys.length; i++){
    params[keys[i]] = values[i];
}
console.log(params); //{ id: '300', name: 'daya' }

/* let keys2 =[];
let regexp2 = pathToRegexp('/home',keys2,{end:true});
let result = "/home/2".match(regexp2)
console.log(result) // null 如果匹配不到是null */