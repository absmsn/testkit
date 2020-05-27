const uuid = require('uuid')
const { generateSalt, computeDigest } = require('../lib/security')
const { userNameEmailExists, addUser } = require('../models/user')

async function signup(ctx) {

    const { userName, email, password } = ctx.request.body
    if (!userName || !email || !password) {
        // bad request
        ctx.throw(400, JSON.stringify({
            error: {
                message: 'incomplete parameters'
            }
        }))
    }

    let [uExist, eExist] = await userNameEmailExists(userName, email)
    if (uExist || eExist) {
        // 检查昵称或邮箱是否已被占用
        let message = uExist ? "username is occpuied" : "email is occpuied"
        // forbidden
        // ctx.response.status
        ctx.throw(403, JSON.stringify({
            error: {
                message: message
            }
        }))
    }

    let user = { userName, email }
    let salt = generateSalt(40, 40)
    user.salt = salt
    user.userID = uuid.v4()
    user.signupTime = Date.now()
    user.hashPassword = computeDigest(password, salt)
    await addUser(user)
    ctx.response.status = 200
}

async function activate(ctx) {

}

module.exports = {
    signup,
    activate
}