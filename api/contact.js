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
      // Handle POST - create new contact submission
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

    } else {
      // Handle GET - fetch all contact submissions (for admin purposes)
      const submissions = await db.collection('contact_submissions')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      res.json({ submissions });
    }

  } catch (error) {
    console.error('Contact operation error:', error);
    res.status(500).json({ message: 'Failed to process contact request' });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default handler;
