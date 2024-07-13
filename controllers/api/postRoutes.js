
import express from 'express';
import { Post, Comment, User } from '../../models/index.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {

        console.log('Request body:', req.body);
        if (!req.body.username || !req.body.title || !req.body.body) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newPost = await Post.create({
            username: req.body.username,
            title: req.body.title,
            body: req.body.body,
            date: req.body.date
        });
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Post.destroy({
            where: {
                post_id: req.params.id
            }
        });
        if (result) {
            res.status(200).send('Post is gonzo');
        } else {
            res.status(418).send('lol that doesnt exist');
        }
    } catch (err) {
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
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

router.get('/:id', async (req, res) => {
    try {
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

export default router;
