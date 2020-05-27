const db = require('../lib/db')
const logger = require('../lib/logger')

async function addUser(params) {
    // 返回插入的列号数组
    await db.table('user').insert(params)
}

async function userNameEmailExists(userName, email) {
    let exists = await db.table('user').where({
        userName: userName
    }).orWhere({
        email: email
    })
    let userNameExists = exists.some(x => x.userName === userName)
    let emailExists = exists.some(x => x.email === email)
    return [userNameExists, emailExists]
}

async function getUserByName(userName) {
    return await db.table('user').where({
        userName: userName
    })
}

async function getUserByEmail(email) {
    let result = await db.table('user').where({
        email: email
    })
    if (result.length > 1) {
        logger.error({
            message: 'multiple users have the same email'
        })
    }
    return result.length === 1 ? result[0] : null
}

module.exports = {
    addUser,
    getUserByName,
    getUserByEmail,
    userNameEmailExists
}