const bcrypt = require('bcrypt')

class HashManager {
    static async hash(password) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }

    static async compare(password, hashedPassword) {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            throw new Error('Error comparing passwords');
        }
    }
}

module.exports = HashManager