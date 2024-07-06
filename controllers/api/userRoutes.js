
import express from 'express';
import { User } from '../../models/index.js';


const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username or email already exists' });
        } else {
            res.status(500).json({ message: 'you dun messed up A-A-RON' });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Assuming session management here
        req.session.userId = user.id; // Set user ID to session
        res.json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON' });
    }
});

//route to logout
router.get('/logout', async (req, res) => {
    try {
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
