import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://backtosource13:Abhay84218@projectdetails.nhx0jvd.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDetails';
const DB_NAME = 'ProjectDetails';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { userid, password } = req.body;

    if (!userid || !password) {
      return res.status(400).json({ message: 'User ID and password are required' });
    }

    // Find user in database
    const user = await db.collection('users').findOne({ userid });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userid: user.userid, id: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (excluding password)
    const { password: _, ...userData } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route example
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await db.collection('users').findOne(
      { userid: req.user.userid },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create sample user (for testing purposes)
app.post('/api/auth/create-sample-user', async (req, res) => {
  try {
    const { userid, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = {
      userid,
      password: hashedPassword,
      createdAt: new Date(),
      name: 'Sample User',
      email: `${userid}@example.com`
    };

    const result = await db.collection('users').insertOne(newUser);

    res.status(201).json({
      message: 'Sample user created successfully',
      userId: result.insertedId
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reviews endpoints
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    // Validate required fields
    if (!name || !rating || !comment) {
      return res.status(400).json({
        message: 'Name, rating, and comment are required'
      });
    }

    // Validate rating (1-5 stars)
    const ratingNum = parseFloat(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5 stars'
      });
    }

    // Create review object
    const review = {
      name,
      rating: ratingNum,
      comment,
      createdAt: new Date(),
      approved: true // Automatically approve for now
    };

    // Save to database
    const result = await db.collection('reviews').insertOne(review);

    console.log('Review submitted:', {
      id: result.insertedId,
      name,
      rating: ratingNum,
      createdAt: review.createdAt
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      reviewId: result.insertedId,
      review
    });

  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

// Get all approved reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await db.collection('reviews')
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      education,
      college,
      year,
      projectDetails,
      submittedAt
    } = req.body;

    // Validate required fields
    if (!name || !email || !projectDetails) {
      return res.status(400).json({
        message: 'Name, email, and project details are required'
      });
    }

    // Create contact submission object
    const contactSubmission = {
      name,
      email,
      phone: phone || '',
      dob: dob || '',
      education: education || '',
      college: college || '',
      year: year || '',
      projectDetails,
      submittedAt: submittedAt || new Date().toISOString(),
      status: 'new', // Track submission status
      createdAt: new Date()
    };

    // Save to database
    const result = await db.collection('contact_submissions').insertOne(contactSubmission);

    console.log('Contact form submitted:', {
      id: result.insertedId,
      name,
      email,
      submittedAt: contactSubmission.submittedAt
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      submissionId: result.insertedId
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

// Get all contact submissions (for admin purposes)
app.get('/api/contact', async (req, res) => {
  try {
    const submissions = await db.collection('contact_submissions')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ submissions });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(console.error);
