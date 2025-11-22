// server.js
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRoutes from './routes/userRoutes.js'
import User from './models/userModel.js'

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());



// API Routes
app.use('/api/users', userRoutes);  // This is the key line!

// Temporary route to add a test user
app.get('/api/users/create-test', async (req, res) => {
  try {
    await User.create({ name: "Mahendra", email: "mahendra@test.com", age: 25 });
    res.send("Test user added! Now go to /api/users");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('<h1>Backend API is Live! Go to /api/users</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});