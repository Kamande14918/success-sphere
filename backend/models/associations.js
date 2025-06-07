import User from './users.model.js';
import Blog from './blogs.model.js';
import Course from './courses.model.js';

User.belongsToMany(Blog, { through: 'BlogLikes', as: 'LikedBlogs' });
User.belongsToMany(Blog, { through: 'BlogViews', as: 'ViewedBlogs' });
User.belongsToMany(Course, { through: 'CourseLikes', as: 'LikedCourses' });
User.belongsToMany(Course, { through: 'CourseViews', as: 'ViewedCourses' });

Blog.belongsTo(User, { foreignKey: 'author_id' });
Blog.belongsToMany(User, { through: 'BlogLikes', as: 'LikedBy' });
Blog.belongsToMany(User, { through: 'BlogViews', as: 'ViewedBy' });

Course.belongsTo(User, { foreignKey: 'instructor_id' });
Course.belongsToMany(User, { through: 'CourseLikes', as: 'LikedBy' });
Course.belongsToMany(User, { through: 'CourseViews', as: 'ViewedBy' });
