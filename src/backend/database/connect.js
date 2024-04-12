const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'example',
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0,
    database:'store_db'
})

pool.getConnection((err,conn)=>{
    if(err)
        throw new Error(`Connection Fail: Plese Check DB Server!!!`)
    console.log(`Connect DataBase Success`);
    conn.release()
})

module.exports = pool