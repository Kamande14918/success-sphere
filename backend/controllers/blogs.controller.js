import Blog from '../models/blogs.model.js';
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

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBlog = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { title, subtitle, content, author_id } = req.body;
            const image_url = req.file ? `/uploads/${req.file.filename}` : null;
            const blog = await Blog.create({ title, subtitle, content, image_url, author_id });

            res.status(201).json(blog);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

export const updateBlog = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, subtitle, content, author_id } = req.body;
            const image_url = req.file ? `/uploads/${req.file.filename}` : null;
            await Blog.update(
                { title, subtitle, content, image_url, author_id },
                { where: { id } }
            );

            const updatedBlog = await Blog.findByPk(id);
            res.status(200).json(updatedBlog);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.destroy({ where: { id } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const blog = await Blog.findByPk(id);
        const user = await User.findByPk(userId);

        const hasLiked = await blog.hasLikedBy(user);

        if (hasLiked) {
            blog.likes -= 1;
            await blog.removeLikedBy(user);
        } else {
            blog.likes += 1;
            await blog.addLikedBy(user);
        }
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const viewBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const blog = await Blog.findByPk(id);
        const user = await User.findByPk(userId);

        const hasViewed = await blog.hasViewedBy(user);

        if (!hasViewed) {
            blog.views += 1;
            await blog.addViewedBy(user);
            await blog.save();
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const commentBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const comments = blog.comments || [];
        comments.push({ user: user.username, email: user.email, comment });
        blog.comments = comments;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
