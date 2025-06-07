import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import courseRoutes from './routes/course.routes.js';
import userRoutes from './routes/user.routes.js';
import './models/users.model.js'; // Ensure User model is imported first
import './models/blogs.model.js'; // Ensure Blog model is imported after User model
import './models/courses.model.js'; // Ensure Course model is imported after User model
import './models/associations.js'; // Import associations to set up relationships
import { EventEmitter } from 'events'; // Import EventEmitter

const app = express();

// Increase the max listeners limit
EventEmitter.defaultMaxListeners = 20;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the uploads directory as a static file server
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes); // Ensure this route is registered
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes); // Use user routes

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Database Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(error => console.log("❌ Database Connection Error:", error));
