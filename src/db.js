const { Pool } = require('pg')

const pool = new Pool({
  user: 'pern',
  password: 'aaa123',
  host: 'localhost',
  port: '5432',
  database: 'tasksdb'
})

module.exports = pool