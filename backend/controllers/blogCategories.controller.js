import BlogCategory from '../models/blogCategories.model.js';

export const getBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};