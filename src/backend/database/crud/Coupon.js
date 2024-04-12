const pool = require('../connect')

class Coupon {
    // Create
    static create(reqpoints, type, discount, description, expire_date) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Coupon (reqpoints, type, discount, description, expire_date) VALUES (?, ?, ?, ?, ?)';
            pool.query(sql, [reqpoints, type, discount, description, expire_date], (err, result) => {
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
            const sql = 'SELECT * FROM Coupon';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by couponID
    static findByID(couponID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Coupon WHERE couponID = ?';
            pool.query(sql, [couponID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(couponID, reqpoints, type, discount, description, expire_date) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Coupon SET reqpoints = ?, type = ?, discount = ?, description = ?, expire_date = ? WHERE couponID = ?';
            pool.query(sql, [reqpoints, type, discount, description, expire_date, couponID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(couponID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Coupon WHERE couponID = ?';
            pool.query(sql, [couponID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Coupon