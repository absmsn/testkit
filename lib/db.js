const Knex = require('knex')
const conf = require('../knexfile')

module.exports = Knex(conf)