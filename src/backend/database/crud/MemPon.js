const pool = require('../connect')

class MemPon {
    // Create
    static create(memberID, couponID, datetime) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO MemPon (memberID, couponID, datetime) VALUES (?, ?, ?)';
            pool.query(sql, [memberID, couponID, datetime], (err, result) => {
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
            const sql = 'SELECT * FROM MemPon';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by memberID
    static findByMemberID(memberID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM MemPon WHERE memberID = ?';
            pool.query(sql, [memberID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by couponID
    static findByCouponID(couponID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM MemPon WHERE couponID = ?';
            pool.query(sql, [couponID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by memberID
    static findByMemberCouponID(memberID,couponID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM MemPon WHERE memberID = ? AND couponID = ?';
            pool.query(sql, [memberID,couponID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Delete by memberID and couponID
    static delete(memberID, couponID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM MemPon WHERE memberID = ? AND couponID = ?';
            pool.query(sql, [memberID, couponID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = MemPon