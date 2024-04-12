const pool = require('../connect')

class Menu {
    // Create
    static create(name, description, category, price, pic, status) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Menu (name, description, category, price, pic, status) VALUES (?, ?, ?, ?, ?, ?)';
            pool.query(sql, [name, description, category, price, pic, status], (err, result) => {
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
            const sql = 'SELECT * FROM Menu';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by menuID
    static findByMenuID(menuID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Menu WHERE menuID = ?';
            pool.query(sql, [menuID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(menuID, name, description, category, price, pic, status) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Menu SET name = ?, description = ?, category = ?, price = ?, pic = ?, status = ? WHERE menuID = ?';
            pool.query(sql, [name, description, category, price, pic, status, menuID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(menuID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Menu WHERE menuID = ?';
            pool.query(sql, [menuID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Menu