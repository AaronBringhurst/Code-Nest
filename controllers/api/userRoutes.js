
import express from 'express';
import User from '../../models/index.js';


const router = express.Router();

//route to render login page
router.get('/login', async (req, res) => {
    try{
        res.render('login');
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
    }
});

//route to create a user
router.post('/signup', async (req, res) => {
    try {
        // Implementation needed
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
    }
});

//route to login an existing user
router.post('/login', async (req, res) => {
    try {
        // Implementation needed
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
    }
});

//route to logout
router.get('/logout', async (req, res) => {
    try {
        // Implemntation needed
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
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
