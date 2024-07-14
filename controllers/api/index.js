
import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoutes);


export default router;
