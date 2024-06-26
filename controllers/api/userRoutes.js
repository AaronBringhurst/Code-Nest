
import express from 'express';
import User from '../../models/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Implementation needed
    } catch (err) {
        res.status(500).send('error creating user');
    }
});

router.delete('/', async (req, res) => {
    try{

    } catch (err) {
        res.status(500).send('error deleting user');
    } 
});

export default router;
