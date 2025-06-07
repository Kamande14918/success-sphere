import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './users.model.js';
import Course from './courses.model.js';

const Subscription = sequelize.define('Subscription', {
    status: { type: DataTypes.ENUM('active', 'expired', 'pending'), defaultValue: 'active' }
}, { timestamps: true });

Subscription.belongsTo(User, { foreignKey: 'user_id' });
Subscription.belongsTo(Course, { foreignKey: 'course_id' });

export default Subscription;
