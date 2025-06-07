import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  likeCourse,
  viewCourse,
  commentCourse,
} from '../controllers/courses.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', verifyToken, isAdmin, createCourse);
router.put('/:id', verifyToken, isAdmin, updateCourse);
router.delete('/:id', verifyToken, isAdmin, deleteCourse);

// New routes for likes, views, and comments
router.post('/:id/like', verifyToken, likeCourse);
router.post('/:id/view', verifyToken, viewCourse);
router.post('/:id/comment', verifyToken, commentCourse);

export default router;
