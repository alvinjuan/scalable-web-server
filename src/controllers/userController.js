const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    async register(req, res, next) {
        try {
            const { email, password, name } = req.body;

            // Check if user exists 
            const userExists = await pool.query(
                'SELECT * FROM users WHERE email = $1', 
                [email]
            );

            if (userExists.rows.length) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const result = await pool.query(
                'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
                [email, hashedPassword, name]
            );

            const token = jwt.sign(
                { userId: result.rows[0].id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                user: result.rows[0],
                token
            });

        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (!result.rows.length) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!validPassword){
                return res.status(401).json({ error: 'Invalid credentials' });

            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new UserController();