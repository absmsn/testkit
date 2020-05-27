const { computeDigest } = require('../lib/security')
const { getUserByEmail } = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('config')

async function login(ctx) {
    const { email, password } = ctx.request.body

    if (!email || !password) {
        ctx.throw(400, JSON.stringify({
            err: {
                message: 'email or password is not provided'
            }
        }))
    }

    const user = await getUserByEmail(email)
    if (user) {
        let hPassword = computeDigest(password, user.salt)
        if (user.hashPassword === hPassword) {

            let jwtSecret = config.get('security.jwtSecret')
            let expireTime = config.get('security.expireTime')
            let token = jwt.sign({
                userName: user.userName,
                expire: Date.now() + expireTime
            }, jwtSecret)

            ctx.response.body = {
                token: token,
                userName: user.userName,
                message: 'correct password'
            }
        }
        else {
            ctx.response.body.message = 'incorrect password'
        }
    } else {
        ctx.response.body.message = 'user not exists'
    }
    ctx.response.status = 200
}

function forget(ctx) {
}

module.exports = {
    login,
    forget
}