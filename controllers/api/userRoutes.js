import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../../models/index.js';
import sequelize from 'sequelize';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        if (!username || !email || !password || !name) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await User.findOne({ where: { [sequelize.Op.or]: [{ username }, { email }] } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            name,
            password: hashedPassword
        });
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
        return res.redirect("/");
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log('User not found:', username);
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        req.session.userId = user.user_id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        return res.redirect("/");
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//route to logout
router.get('/logout', async (req, res) => {
    try {
        console.log (req.session);
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect('/login'); // Redirect to login page after logout
        });
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON' });
    }
});


//route to delete a user
router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findone({ where: { id: req.params.id }});
        if (!user) {
            return res.status(404).send({ message: 'user not found'});
        }
        await User.destroy({ where: { id: req.params.id}});
        res.send('user is gonzo');
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
    } 
});

export default router;
