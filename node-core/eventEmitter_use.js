let EventEmitter = require('./events');
let Util =  require('util');

function Girl(){
}

Util.inherits(Girl, EventEmitter);

let girl =  new Girl();

function cry(a, b){
    console.log('大哭');
}
function shopping(){
    console.log('购物');
}


let count = 0;
girl.on('newListener', function(eventType, callback){
   count++
   console.log(count, eventType,callback);
})
girl.on('失恋', cry);
// girl.on('失恋', cry);
girl.once('失恋', shopping);
// girl.off('失恋', shopping);
girl.emit('失恋');

