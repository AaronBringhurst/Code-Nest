
import express from 'express';
import { Post } from '../../models/index.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {

        console.log('Request body:', req.body);

        const newPost = await Post.create({
            username: req.body.username,
            title: req.body.title,
            body: req.body.body,
            date: req.body.date
        });
        res.status(201).json(newPost);
        // Implementation needed
    } catch (err) {

        console.error('Error creating post:', err);
        
        res.status(500).json({ message: 'you dun messed up A-A-RON'});
    }
});

router.delete('/delete:id', async (req, res) => {
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


export default router;
