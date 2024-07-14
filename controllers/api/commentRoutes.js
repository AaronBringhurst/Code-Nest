import express from 'express';
import { Comment, Post, User } from '../../models/index.js';

const router = express.Router();

//this route grabs the post id so it can populate the data inside the modal
router.get('/post-modal/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [{ model: User, attributes: ['username'] }] }
            ]
        });

        if (post) {
            res.render('partials/postModalContent', { 
                layout: false,
                post: post.get({ plain: true })
            });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        console.error('Error in /post-modal/:id route:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// This route is responsible for adding comments to a specific post.
router.post('/', async (req, res) => {
    console.log('Received POST request to /api/comment');
    console.log('Request body:', req.body);
    try {
        const { post_id, content } = req.body;
        const user_id = req.session.user_id; 

        if (!post_id || !content) {
            return res.status(400).json({ message: 'Post ID and comment content are required' });
        }

        const newComment = await Comment.create({
            content, 
            post_id,
            user_id: user_id || null
        });

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

//This route updates a comment
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

//this route deletes a comment
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
