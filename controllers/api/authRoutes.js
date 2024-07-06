import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/index.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'User logged in successfully' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

export default router