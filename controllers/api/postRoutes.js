
import express from 'express';
import { Post, Comment, User } from '../../models/index.js';

const router = express.Router();

//this route creates a post
router.post('/create', async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ message: 'You must be logged in to create a post.' });
        }

        if (!req.body.title || !req.body.body) {
            return res.status(400).json({ message: 'Title and body are required.' });
        }

        const user = await User.findByPk(req.session.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const newPost = await Post.create({
            username: user.username,
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id,
            date: new Date()
        });

        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'An error occurred while creating the post.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = postData.get({ plain: true });
        res.json(post);
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json({ message: 'Failed to load post' });
    }
});

// This route gets the single id of a post and populates it with any comments
router.get('/:id', async (req, res) => {
    try {
        console.log(req.session);
        if (!req.session.logged_in) {
            res.redirect('/login');
            return
        }
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }],
                    order: [['createdAt', 'DESC']]
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        if (post) {
            console.log('Fetched post:', JSON.stringify(post, null, 2));
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//this route allows the user to make changes to there post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (updatedPost[0] === 0) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//this route allows the user to delete a post they made
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router;
