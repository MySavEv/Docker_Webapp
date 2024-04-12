const pool = require('../connect')

class WithdrawHistory {
    // Create
    static create(employeeID, ingredientID, stockID, comment, datetime) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Withdraw_History (employeeID, ingredientID, stockID, comment, datetime) VALUES (?, ?, ?, ?, ?)';
            pool.query(sql, [employeeID, ingredientID, stockID, comment, datetime], (err, result) => {
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
            const sql = 'SELECT * FROM Withdraw_History';
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
            const sql = 'SELECT * FROM Withdraw_History WHERE employeeID = ?';
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
    static update(employeeID, ingredientID, stockID, comment, datetime) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Withdraw_History SET comment = ?, datetime = ? WHERE employeeID = ? AND ingredientID = ? AND stockID = ?';
            pool.query(sql, [comment, datetime, employeeID, ingredientID, stockID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(employeeID, ingredientID, stockID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Withdraw_History WHERE employeeID = ? AND ingredientID = ? AND stockID = ?';
            pool.query(sql, [employeeID, ingredientID, stockID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = WithdrawHistory