import express from 'express';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  viewBlog,
  commentBlog,
} from '../controllers/blogs.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', verifyToken, isAdmin, createBlog);
router.put('/:id', verifyToken, isAdmin, updateBlog);
router.delete('/:id', verifyToken, isAdmin, deleteBlog);

// New routes for likes, views, and comments
router.post('/:id/like', verifyToken, likeBlog);
router.post('/:id/view', verifyToken, viewBlog);
router.post('/:id/comment', verifyToken, commentBlog);

export default router;
