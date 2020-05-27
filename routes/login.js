const login = require('../controllers/login')

const Router = require('koa-router')
const router = new Router({'prefix': '/login'})

router.post('/', login.login)
router.post('/forget', login.forget)

module.exports = router.routes()