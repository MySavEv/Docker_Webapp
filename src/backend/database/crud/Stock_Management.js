const pool = require('../connect')

class StockManagement {
    // Create
    static create(employeeID, stockID, type, quantity, comment, datetime) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Stock_Management (employeeID, stockID, type, quantity, comment, datetime) VALUES (?, ?, ?, ?, ?, ?)';
            pool.query(sql, [employeeID, stockID, type, quantity, comment, datetime], (err, result) => {
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
            const sql = 'SELECT * FROM Stock_Management';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by employeeID
    static findByEmployeeID(employeeID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Stock_Management WHERE employeeID = ?';
            pool.query(sql, [employeeID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(employeeID, stockID, type, quantity, comment, datetime) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Stock_Management SET type = ?, quantity = ?, comment = ?, datetime = ? WHERE employeeID = ? AND stockID = ?';
            pool.query(sql, [type, quantity, comment, datetime, employeeID, stockID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(employeeID, stockID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Stock_Management WHERE employeeID = ? AND stockID = ?';
            pool.query(sql, [employeeID, stockID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = StockManagement