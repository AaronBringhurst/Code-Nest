import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../../models/index.js';
import sequelize from 'sequelize';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        if (!username || !email || !password || !name) {
            return res.status(400).render('login', { error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ 
            where: { 
                [sequelize.Op.or]: [{ username }, { email }] 
            } 
        });

        if (existingUser) {
            return res.status(400).render('login', { error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            name,
            password: hashedPassword
        });

        // Automatically log in the user
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.logged_in = true;

        // Save the session before redirecting
        req.session.save(() => {
            res.redirect('/');
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).render('login', { error: 'An error occurred during signup. Please try again.' });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(400).render('login', { error: 'Incorrect username or password' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(400).render('login', { error: 'Incorrect username or password' });
      }
  
      req.session.user_id = user.user_id;
      req.session.username = user.username;
      req.session.logged_in = true;
  
      res.redirect('/'); // Redirect to homepage after successful login
  
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).render('login', { error: 'An error occurred. Please try again.' });
    }
  });
  

//route to logout
router.get('/logout', async (req, res) => {
    try {
        console.log('Session Data before logout:', req.session);
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            
            res.redirect('/');
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
