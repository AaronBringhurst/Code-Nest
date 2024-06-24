// ESM import syntax
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getPosts();  // Ensure getPosts is defined or imported
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).send('Error fetching Posts');
    }
});

// ESM export syntax
export default router;
