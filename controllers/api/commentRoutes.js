import express from 'express';
import { Comment, Post, User } from '../../models/index.js';

const router = express.Router();

router.get('/post-modal/:id', async (req, res) => {
    try {
        console.log(`Attempting to fetch post with id: ${req.params.id}`);
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [{ model: User, attributes: ['username'] }] }
            ]
        });
        if (post) {
            console.log('Post found, rendering template');
            res.render('partials/postModalContent', { 
                layout: false,
                post: post.get({ plain: true })
            });
        } else {
            console.log('Post not found');
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        console.error('Error in /post-modal/:id route:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});


router.post('/', async (req, res) => {
    console.log('Received POST request to /api/comments');
    console.log('Request body:', req.body);
    try {
        const { post_id, body } = req.body;
        const user_id = req.session.user_id; // Assuming you're using session-based authentication

        if (!post_id || !body) {
            return res.status(400).json({ message: 'Post ID and comment body are required' });
        }

        // Create the comment
        const newComment = await Comment.create({
            content: body,  // Make sure this matches your Comment model
            post_id,
            user_id: user_id || null
        });

        // Fetch the user information if available
        let commentWithUser = newComment.toJSON();
        if (user_id) {
            const user = await User.findByPk(user_id, { attributes: ['username'] });
            commentWithUser.user = { username: user.username };
        } else {
            commentWithUser.user = { username: 'Anonymous' };
        }

        res.status(201).json(commentWithUser);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
});

router.put('/:commentId', async (req, res) => {
    try {
        const { content } = req.body;
        const commentId = req.params.commentId;

        const updated = await Comment.update({ content }, {
            where: { id: commentId }
        });

        if (updated[0] === 0) {
            return res.status(404).json({ message: 'Comment not found or no change made' });
        }

        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Error updating comment' });
    }
});

router.delete('/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const deleted = await Comment.destroy({
            where: { id: commentId }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment' });
    }
});

export default router;
