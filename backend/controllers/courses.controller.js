import Course from '../models/courses.model.js';
import User from '../models/users.model.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCourse = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { title, description, price, instructor_id } = req.body;
            const image_url = req.file ? `/uploads/${req.file.filename}` : null;
            const course = await Course.create({ title, description, price, image_url, instructor_id });

            res.status(201).json(course);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

export const updateCourse = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, price, instructor_id } = req.body;
            const image_url = req.file ? `/uploads/${req.file.filename}` : null;
            await Course.update(
                { title, description, price, image_url, instructor_id },
                { where: { id } }
            );

            const updatedCourse = await Course.findByPk(id);
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.destroy({ where: { id } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const likeCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const course = await Course.findByPk(id);
        const user = await User.findByPk(userId);

        const hasLiked = await course.hasLikedBy(user);

        if (hasLiked) {
            course.likes -= 1;
            await course.removeLikedBy(user);
        } else {
            course.likes += 1;
            await course.addLikedBy(user);
        }
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const viewCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const course = await Course.findByPk(id);
        const user = await User.findByPk(userId);

        const hasViewed = await course.hasViewedBy(user);

        if (!hasViewed) {
            course.views += 1;
            await course.addViewedBy(user);
            await course.save();
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const commentCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const comments = course.comments || [];
        comments.push({ user: user.username, email: user.email, comment });
        course.comments = comments;
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
