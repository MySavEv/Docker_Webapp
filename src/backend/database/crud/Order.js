const pool = require('../connect')

class Order {
    // Create
    static create(customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO `Order` (customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            pool.query(sql, [customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status], (err, result) => {
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
            const sql = 'SELECT * FROM `Order`';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by orderID
    static findByOrderID(orderID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM `Order` WHERE orderID = ?';
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
    static update(orderID, customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE `Order` SET customerID = ?, employeeID = ?, couponID = ?, datetime = ?, discount = ?, subtotal = ?, total_price = ?, status = ? WHERE orderID = ?';
            pool.query(sql, [customerID, employeeID, couponID, datetime, discount, subtotal, total_price, status, orderID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(orderID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM `Order` WHERE orderID = ?';
            pool.query(sql, [orderID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Order