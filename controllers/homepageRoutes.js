
import express from 'express';
import { User, Post } from '../models/index.js'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Fetch all posts and convert them to plain objects
        const posts = await Post.findAll();
        const plainPosts = posts.map(post => post.get({ plain: true }));

        // Render the homepage with posts data
        res.render('homepage', { posts: plainPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle errors gracefully, possibly rendering an error page or passing an error message
        res.status(500).render('error', { error: 'Failed to load posts' });
    }
});



export default router;
