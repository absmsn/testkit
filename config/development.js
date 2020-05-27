module.exports = {
    db: {
        client: "sqlite3"
    },
    server: {
        host: "localhost",
        port: 8000
    },
    security: {
        jwtSecret: "abcd",
        expireTime: 60*60*1000
    }
}