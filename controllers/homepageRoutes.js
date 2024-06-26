
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getPosts();
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).send('Error fetching Posts');
    }
});


export default router;
