const Koa = require('koa')
const router = require('./routes')
const cors = require('koa2-cors')
const config = require('config')
const bodyParser = require('koa-bodyparser')
const KoaJwt = require('koa-jwt')

const app = new Koa()

let port = config.get('server.port')

app.use(
    cors({
        origin: '*',
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    }
))
app.use(KoaJwt({
    passthrough: true,
    secret: config.get('security.jwtSecret'),
}).unless({
    path: [/^\/login/]
}))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(port)