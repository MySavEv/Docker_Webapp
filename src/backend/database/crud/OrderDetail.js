const pool = require('../connect')

class OrderDetail {
    // Create
    static create(menuID, orderID, amount, subPrice) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO OrderDetail (menuID, orderID, amount, subPrice) VALUES (?, ?, ?, ?)';
            pool.query(sql, [menuID, orderID, amount, subPrice], (err, result) => {
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
            const sql = 'SELECT * FROM OrderDetail';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by detailID
    static findByDetailID(detailID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM OrderDetail WHERE detailID = ?';
            pool.query(sql, [detailID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(detailID, menuID, orderID, amount, subPrice) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE OrderDetail SET menuID = ?, orderID = ?, amount = ?, subPrice = ? WHERE detailID = ?';
            pool.query(sql, [menuID, orderID, amount, subPrice, detailID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(detailID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM OrderDetail WHERE detailID = ?';
            pool.query(sql, [detailID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = OrderDetail