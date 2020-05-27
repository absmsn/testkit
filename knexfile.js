const config = require('config')
const fs = require('fs')

if(!process.env.NODE_ENV){
  process.env.NODE_ENV = 'development'
}

const client = config.get('db.client')
const connection = config.has('db.connection') && config.get('db.connection')

if (client === "sqlite3") {
  try {
    fs.mkdirSync("data")
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err
    }
  }
}

const options = {
  client: client,
  connection: connection || {
    filename: "data/dev.sqlite3",
  },
  migrations: {
    directory: "lib/migrations",
    tableName: "migrations",
  },
  debug: false,
  useNullAsDefault: client === "sqlite3",
}

if (client !== "sqlite3") {
  options.pool = {
    min: 2,
    max: 10,
  }
}

const configs = {
  development: Object.assign({}, options),

  test: Object.assign({}, options, {
    connection: connection || {
      filename: "data/test.sqlite3",
    },
  }),

  production: Object.assign({}, options),
}

Object.assign(configs, configs[process.env.NODE_ENV])

module.exports = configs
