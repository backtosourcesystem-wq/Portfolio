import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let client;

  try {
    const { userid, password } = req.body;

    if (!userid || !password) {
      return res.status(400).json({ message: 'User ID and password are required' });
    }

    // Connect to MongoDB
    const MONGODB_URI = 'mongodb+srv://backtosource13:Abhay84218@projectdetails.nhx0jvd.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDetails';

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db('ProjectDetails');

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

    // JWT secret
    const JWT_SECRET = '67f308a89ec27cdc04399e94f059dacae6952fdc8a45181bf53d5b5c2a8dff0de79c16024cb2112dccc73862e9f2724dcedfaddfdcecd1c3ea997ff9e07b59e9e';

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
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default handler;
