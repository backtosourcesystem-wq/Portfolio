import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let client;

  try {
    const { userid, password } = req.body;

    if (!userid || !password) {
      return res.status(400).json({ message: 'User ID and password are required' });
    }

    const MONGODB_URI = 'mongodb+srv://backtosource13:Abhay84218@projectdetails.nhx0jvd.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDetails';

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db('ProjectDetails');

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
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default handler;
