import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let client;

  try {
    const MONGODB_URI = 'mongodb+srv://backtosource13:Abhay84218@projectdetails.nhx0jvd.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDetails';

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db('ProjectDetails');

    if (req.method === 'POST') {
      // Handle POST - create new review
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

    } else {
      // Handle GET - fetch all approved reviews
      const reviews = await db.collection('reviews')
        .find({ approved: true })
        .sort({ createdAt: -1 })
        .toArray();

      res.json({ reviews });
    }

  } catch (error) {
    console.error('Reviews operation error:', error);
    res.status(500).json({ message: 'Failed to process reviews request' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default handler;
