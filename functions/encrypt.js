const crypto = require('crypto');

function encrypt(text) {
    var mykey = crypto.createCipher('aes-128-cbc', 'thepasswordisincorrect');
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.update.final('hex');
    return mystri
}

function decrypt(text) {
    var mykey = crypto.createDecipher('aes-128-cbc', 'thepasswordisincorrect');
    var mystr = mykey.update(text, 'hex', 'utf8')
    mystr += mykey.update.final('utf8');
    return mystr
}

module.exports = { decrypt, encrypt };
