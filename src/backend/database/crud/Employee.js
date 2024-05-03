const pool = require('../connect')

class Customer {
    // Create
    static create(email, join_date, name,tel,salary, birthDay, street, subdistrict, district, city, zipcode, baristaflag, cashierflag, managerflag) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Employee (email, join_date, name,tel,salary, birthDay, street, subdistrict, district, city, zipcode, baristaflag, cashierflag, managerflag) 
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)`
            pool.query(sql, [email, join_date, name,tel,salary, birthDay, street, subdistrict, district, city, zipcode, baristaflag, cashierflag, managerflag], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Read all
    static findAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Employee';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by customerID
    static findByID(customerID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Employee WHERE employeeID = ?';
            pool.query(sql, [customerID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static async update(employeeID, fields ) {
        return new Promise(async (resolve, reject) => {
            let sub = ''
            for(i in fields){
                sub += await `${i} = ${fields[i]},`
            }
            sub = await sub.slice(0,-1);
            const sql = `UPDATE \`Employee\` SET ${sub} WHERE employeeID = ?`;
            pool.query(sql, [employeeID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(employeeID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Employee WHERE employeeID = ?';
            pool.query(sql, [employeeID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Customer