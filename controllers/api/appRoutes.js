const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getPosts();
        res.render('homepage', { posts });
    } catch (err) {
        console.log('Error fetching Postz', err );
    }
});

module.exports = router;