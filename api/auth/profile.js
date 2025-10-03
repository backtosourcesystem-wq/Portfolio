import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  let client;

  try {
    const JWT_SECRET = '67f308a89ec27cdc04399e94f059dacae6952fdc8a45181bf53d5b5c2a8dff0de79c16024cb2112dccc73862e9f2724dcedfaddfdcecd1c3ea997ff9e07b59e9e';

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      try {
        const MONGODB_URI = 'mongodb+srv://backtosource13:Abhay84218@projectdetails.nhx0jvd.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDetails';

        client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db('ProjectDetails');

        const user = await db.collection('users').findOne(
          { userid: decoded.userid },
          { projection: { password: 0 } }
        );

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
      } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Internal server error' });
      } finally {
        if (client) {
          await client.close();
        }
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default handler;
