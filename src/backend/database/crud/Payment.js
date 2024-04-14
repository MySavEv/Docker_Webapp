const pool = require('../connect')

class Payment {
    // Create
    static create(orderID, method, amount, status, datetime, successdatetime) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Payment (orderID, method, amount, status, datetime, successdatetime) VALUES (?, ?, ?, ?, ?, ?)';
            pool.query(sql, [orderID, method, amount, status, datetime, successdatetime], (err, result) => {
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
            const sql = 'SELECT * FROM Payment';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by paymentID
    static findByPaymentID(paymentID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Payment WHERE paymentID = ?';
            pool.query(sql, [paymentID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by paymentID
    static findByOrderID(orderID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Payment WHERE orderID = ?';
            pool.query(sql, [orderID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    // Update
    static update(paymentID, orderID, method, amount, status, datetime, successdatetime) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Payment SET orderID = ?, method = ?, amount = ?, status = ?, datetime = ?, successdatetime = ? WHERE paymentID = ?';
            pool.query(sql, [orderID, method, amount, status, datetime, successdatetime, paymentID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(paymentID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Payment WHERE paymentID = ?';
            pool.query(sql, [paymentID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Payment