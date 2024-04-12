const pool = require('../connect')

class Member {
    // Create
    static create(gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Member (gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            pool.query(sql, [gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode], (err, result) => {
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
            const sql = 'SELECT * FROM Member';
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
    static findByID(memberID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Member WHERE memberID = ?';
            pool.query(sql, [memberID], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Update
    static update(memberID, gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Member SET gender = ?, name = ?, email = ?, tel = ?, join_date = ?, birthday = ?, points = ?, street = ?, subdistrict = ?, district = ?, city = ?, zipcode = ? WHERE memberID = ?';
            pool.query(sql, [gender, name, email, tel, join_date, birthday, points, street, subdistrict, district, city, zipcode, memberID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static edit_profile(gender, name, emial, tel, street, subdistrict, district, city, zipcode) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Member SET gender = ?, name = ?, email = ?, tel = ?, street = ?, subdistrict = ?, district = ?, city = ?, zipcode = ? WHERE memberID = ?';
            pool.query(sql, [gender, name, email, tel, street, subdistrict, district, city, zipcode, memberID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    // Delete
    static delete(memberID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Member WHERE memberID = ?';
            pool.query(sql, [memberID], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Member