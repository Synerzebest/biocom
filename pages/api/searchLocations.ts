import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface LocationData {
  id: string;
  name: string;
  address: string;
  city: string;
  productionPlace: string;
  products: string[];
  photos: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query;
  const url = process.env.MONGODB_URI;

  if (!url) {
    return res.status(500).json({ message: 'MongoDB URI not found' });
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db('database');
    const locations = await db.collection<LocationData>('locations').find({ city: new RegExp(city as string, 'i') }).toArray();
    client.close();
    res.status(200).json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'An error occurred while fetching locations' });
  }
}
