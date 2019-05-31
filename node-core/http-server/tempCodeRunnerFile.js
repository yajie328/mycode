// openssl
let r = crypto.createHmac('sha1','secret1').update('1234').digest('base64')
console.log(r);