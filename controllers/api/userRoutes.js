
import express from 'express';
import { User } from '../../models';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Implementation needed
    } catch (err) {
        res.status(500).send('error creating user');
    }
});


export default router;
