const pool = require('../connect')

class MenuIngredient {
    // Create
    static create(menuID, ingredientID, quantity_usage) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Menu_Ingredeint (menuID, ingredientID, quantity_usage) VALUES (?, ?, ?)';
            pool.query(sql, [menuID, ingredientID, quantity_usage], (err, result) => {
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
            const sql = 'SELECT * FROM Menu_Ingredeint';
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
            const sql = 'SELECT * FROM Menu_Ingredeint WHERE menuID = ?';
            pool.query(sql, [menuID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by ingredientID
    static findByIngredientID(ingredientID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Menu_Ingredeint WHERE ingredientID = ?';
            pool.query(sql, [ingredientID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Delete by menuID and ingredientID
    static delete(menuID, ingredientID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Menu_Ingredeint WHERE menuID = ? AND ingredientID = ?';
            pool.query(sql, [menuID, ingredientID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = MenuIngredient