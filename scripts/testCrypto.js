const crypto = require('crypto');

const randomBytes = crypto.randomBytes(20);
console.log(randomBytes.toString('hex'));
