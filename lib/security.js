const crypto = require('crypto')

function computeDigest(text, salt) {
    if (typeof text !== 'string' || typeof salt !== 'string')
        throw TypeError('incorrect paramater type')

    const hmac = crypto.createHmac('sha512', salt)
    return hmac.update(text).digest('hex')
}

function generateSalt(short, long) {
    const char = `1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTVUWXYZ
                  ~!@#$%^&*()_+{}|:"<>?,./;[]=-`
    let nums = Math.floor(Math.random() * (long - short)) + short
    let str = []
    for (let i = 0; i < nums; i++) {
        let j = Math.floor(Math.random() * char.length)
        str.push(char[j])
    }
    str = str.join('')
    return str
}

module.exports = {
    computeDigest,
    generateSalt
}