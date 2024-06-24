
import express from 'express';
import { Post } from '../../models';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Implementation needed
    } catch (err) {
        res.status(500).send('error creating post');
    }
});

router.delete('/', async (req, res) => {
    try {
        // Implementation needed
    } catch (err) {
        res.status(500).send('error deleting post');
    }
});


export default router;
