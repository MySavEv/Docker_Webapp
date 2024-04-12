const pool = require('../connect')

class Ingredient {
    // Create
    static create(name, unit, quantity, pic) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Ingredient (name, unit, quantity, pic) VALUES (?, ?, ?, ?)';
            pool.query(sql, [name, unit, quantity, pic], (err, result) => {
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
            const sql = 'SELECT * FROM Ingredient';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by ingredientID
    static findByID(ingredientID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Ingredient WHERE ingredientID = ?';
            pool.query(sql, [ingredientID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(ingredientID, name, unit, quantity, pic) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Ingredient SET name = ?, unit = ?, quantity = ?, pic = ? WHERE ingredientID = ?';
            pool.query(sql, [name, unit, quantity, pic, ingredientID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(ingredientID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Ingredient WHERE ingredientID = ?';
            pool.query(sql, [ingredientID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Ingredient