const pool = require('../connect')

class AuthMember {
    // Create
    static create(username, memberID, password) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO AuthMember (username, memberID, password) VALUES (?, ?, ?)';
            pool.query(sql, [username, memberID, password], (err, result) => {
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
            const sql = 'SELECT * FROM AuthMember';
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
            const sql = 'SELECT * FROM AuthMember WHERE username = ?';
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
    static update(username, memberID, password) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE AuthMember SET memberID = ?, password = ? WHERE username = ?';
            pool.query(sql, [memberID, password, username], (err, result) => {
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
            const sql = 'DELETE FROM AuthMember WHERE username = ?';
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

module.exports = AuthMember