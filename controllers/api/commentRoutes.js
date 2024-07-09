import express from 'express';
import { Comment } from '../../models/index.js';

const router = express.Router();

router.post('/:postId', async (req, res) => {
    try {
        const { userId, content } = req.body;
        const postId = req.params.postId;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        // Optional: Check if the post exists before adding a comment
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = await Comment.create({
            content,
            userId,
            postId
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Error creating comment' });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({
            where: { postId },
            include: [{ model: User, attributes: ['username'] }]
        });

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this post' });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json({ message: 'Error retrieving comments' });
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
