import express from "express";
import { User, Post } from "../models/index.js";
const router = express.Router();


const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find all posts for the logged-in user
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      console.log('Posts for dashboard:', posts);  // Add this for debugging
      console.log('Number of posts:', posts.length);

      const templateData = {
        posts,
        logged_in: true,
        username: req.session.username
      };
      console.log('Data being passed to template:', templateData);
      res.render('dashboard', templateData);
    /*res.render('dashboard', {
        posts,
        logged_in: true,
        username: req.session.username
      });*/
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      res.status(500).json(err);
    }
  });

router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll({
          include: [
                {
                    model: User,
                    attributes: ['user_id', 'username'],
                }
            ],
            attributes: ['post_id', 'title', 'body', 'createdAt', 'user_id'],
            order: [['createdAt', 'DESC']]
        });
        const plainPosts = posts.map(post => post.get({ plain: true }));
        console.log(plainPosts);

      res.render('homepage', { 
        posts: plainPosts,
        logged_in: req.session.logged_in
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).render('error', { error: 'Failed to load posts' });
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/about", (req, res) => {
  res.render("about");
});


export default router;
