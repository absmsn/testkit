const login = require('./login')
const signup = require('./signup')

const Router = require('koa-router')
const router = new Router()

router.use(login)
router.use(signup)

module.exports = router