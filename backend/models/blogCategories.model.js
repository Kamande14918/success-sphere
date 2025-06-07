import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const BlogCategory = sequelize.define('BlogCategory', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, { timestamps: false });

export default BlogCategory;
