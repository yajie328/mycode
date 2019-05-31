// 加密 摘要算法
let crypto = require('crypto');

//md5 不能解密 摘要算法

// 好处 不同内容 摘要出的结果不同
// 相同内容 摘要结果相同
// 摘要的结果的长度都是定长

// let r = crypto.createHash('md5').update('1234').digest('base64')
// console.log(r);

// cookie 签名算法

// openssl
let r = crypto.createHmac('sha1','secret1').update('123456').digest('base64')
console.log(r);

let r1 = crypto.createHmac('sha1','secret1').update('123').update('456').digest('base64');
console.log(r1 == r);