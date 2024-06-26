
import express from 'express';
import apiRoutes from './api/index.js';
import homepageRoutes from './homepageRoutes.js';

const router = express.Router();

router.use('/api', apiRoutes);
router.use('/', homepageRoutes);


export default router;
