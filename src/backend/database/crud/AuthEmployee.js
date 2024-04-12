const pool = require('../connect')

class AuthEmployee {
    // Create
    static create(username, employeeID, password) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO AuthEmployee (username, employeeID, password) VALUES (?, ?, ?)';
            pool.query(sql, [username, employeeID, password], (err, result) => {
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
            const sql = 'SELECT * FROM AuthEmployee';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by username
    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM AuthEmployee WHERE username = ?';
            pool.query(sql, [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(username, employeeID, password) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE AuthEmployee SET employeeID = ?, password = ? WHERE username = ?';
            pool.query(sql, [employeeID, password, username], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(username) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM AuthEmployee WHERE username = ?';
            pool.query(sql, [username], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = AuthEmployee