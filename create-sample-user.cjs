const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://backtosource13:Abhay84218@projectdetails.nhx0jvd.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDetails';
const DB_NAME = 'ProjectDetails';

async function createSampleUser() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);

    // Sample user data
    const sampleUser = {
      userid: 'admin',
      password: await bcrypt.hash('password123', 10), // Hashed password
      name: 'Administrator',
      email: 'admin@example.com',
      createdAt: new Date(),
      role: 'admin'
    };

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ userid: sampleUser.userid });

    if (existingUser) {
      console.log('Sample user already exists!');
      console.log('User ID: admin');
      console.log('Password: password123');
      return;
    }

    // Insert the sample user
    const result = await db.collection('users').insertOne(sampleUser);

    console.log('Sample user created successfully!');
    console.log('User ID: admin');
    console.log('Password: password123');
    console.log('User document ID:', result.insertedId);

  } catch (error) {
    console.error('Error creating sample user:', error);
  } finally {
    await client.close();
  }
}

createSampleUser();
