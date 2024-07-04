
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [["createdAt", "DESC"]],
            include: [{
                model: User,
                attributes: ['name', 'username', 'password'] 
            }]
        });
        const loggedIn = req.session.loggedIn || false;
        res.render('homepage', { posts, loggedIn });
    } catch (err) {
        res.status(500).send('Error fetching posts');
    }
});



export default router;
