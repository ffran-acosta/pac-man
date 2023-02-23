const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.P_USER,
    host: process.env.P_HOST,
    database: process.env.P_DATABASE,
    password: process.env.P_PASSWORD,
    port: process.env.P_PORT,
})

module.exports = pool
