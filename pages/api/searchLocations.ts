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
  sectors: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city, sector } = req.query;
  const url = process.env.MONGODB_URI;

  if (!url) {
    return res.status(500).json({ message: 'MongoDB URI not found' });
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db('database');
    const locations = db.collection<LocationData>('locations');

    const filter: any = {};
    if (city) {
      filter.city = new RegExp(city as string, 'i');
    }
    if (sector) {
      const sectorsArray = Array.isArray(sector) ? sector : [sector];
      if (sectorsArray.length > 0) { // Si le secteur est non vide
        filter.sectors = { $all: sectorsArray };
      }
    }
    
    if (!city) {
      delete filter.city;
    }

    const filteredLocations = await locations.find(filter).toArray();

    client.close();
    res.status(200).json({ locations: filteredLocations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'An error occurred while fetching locations' });
  }
}