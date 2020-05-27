const signup = require('../controllers/signup')

const Router = require('koa-router')
const router = new Router({'prefix': '/signup'})

router.post('/', signup.signup)
router.post('/activate/:rand_id', signup.activate)

module.exports = router.routes()