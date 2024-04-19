const pool = require('../connect')

class StockIngredient {
    // Create
    static create(ingredientID, stock_quantity, status, date, expire_date) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Stock_Ingredient (ingredientID, stock_quantity, status, date, expire_date) VALUES (?, ?, ?, ?, ?)';
            pool.query(sql, [ingredientID, stock_quantity, status, date, expire_date], (err, result) => {
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
            const sql = 'SELECT * FROM Stock_Ingredient';
            pool.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Read by stockID
    static findByStockID(stockID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Stock_Ingredient WHERE stockID = ?';
            pool.query(sql, [stockID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(stockID, ingredientID, stock_quantity, status, date, expire_date) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Stock_Ingredient SET ingredientID = ?, stock_quantity = ?, status = ?, date = ?, expire_date = ? WHERE stockID = ?';
            pool.query(sql, [ingredientID, stock_quantity, status, date, expire_date, stockID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete
    static delete(stockID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Stock_Ingredient WHERE stockID = ?';
            pool.query(sql, [stockID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = StockIngredient