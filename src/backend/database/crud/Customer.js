const pool = require('../connect')

class Customer {
    // Create
    static create(memberID, type) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Customer (memberID, type) VALUES (?, ?)';
            pool.query(sql, [memberID, type], (err, result) => {
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
            const sql = 'SELECT * FROM Customer';
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
            const sql = 'SELECT * FROM Customer WHERE customerID = ?';
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
    static update(customerID, memberID, type) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Customer SET memberID = ?, type = ? WHERE customerID = ?';
            pool.query(sql, [memberID, type, customerID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(customerID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Customer WHERE customerID = ?';
            pool.query(sql, [customerID], (err, result) => {
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