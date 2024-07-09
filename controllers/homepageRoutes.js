
import express from 'express';
import { User, Post } from '../models/index.js'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Fetch all posts and convert them to plain objects
        const posts = await Post.findAll();
        const plainPosts = posts.map(post => post.get({ plain: true }));

        // Render the homepage with posts data
        res.render('homepage', { 
            posts: plainPosts,
            loggedIn : req.session.loggedIn
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle errors gracefully, possibly rendering an error page or passing an error message
        res.status(500).render('error', { error: 'Failed to load posts' });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.user_id) {
        // User is not logged in
        res.redirect('/login');
    } else {
        // User is logged in
        try {
            const posts = await Post.findAll({
                where: {
                    userId: req.session.userId // Assuming you store userId in session upon login
                }
            });
            res.render('dashboard', {
                posts: posts,
                username: req.session.username // Assuming username is also stored in session
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).render('error', { error: 'Failed to load dashboard' });
        }
    }
});

export default router;
