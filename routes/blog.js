import express from 'express';
import {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById
} from '../controllers/blogController.js';

import auth from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/save-draft', auth, saveDraft);
router.post('/publish', auth, publishBlog);
router.get('/', auth, getAllBlogs);
router.get('/:id', auth, getBlogById);


export default router;
