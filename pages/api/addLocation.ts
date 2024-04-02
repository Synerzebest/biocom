import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

interface LocationData {
  id: string;
  name: string;
  address: string;
  city: string;
  productionPlace: string;
  products: string[];
  sectors: string[];
}

export const config = { api: { bodyParser: { sizeLimit: '25mb' } } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const url = process.env.MONGODB_URI || "";

    if (!url) {
      throw new Error("Mongodb url is undefined")
    }

    let client;

    try {
      client = await MongoClient.connect(url);
      const db = client.db('database');

      await db.collection('locations').createIndex({ name: 1 });
      await db.collection('locations').createIndex({ city: 1 });
      await db.collection('locations').createIndex({ sectors: 1 });

      const { name, address, city, productionPlace, products, photos, sectors } = req.body;

      const existingLocation = await db.collection('locations').findOne({ name });

      if (existingLocation) {
        console.log('A location with the same name already exists')
        return res.status(400).json({ message: 'A location with the same name already exists' });
      }

      const location: LocationData = {
        id: uuidv4(),
        name: name,
        address: address,
        city: city,
        productionPlace: productionPlace,
        products: products,
        sectors: sectors,
      };

      await db.collection('unvalidated-locations').insertOne(location);

      res.status(201).json({ message: 'Location added successfully' });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while adding the location' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(400).json({ message: "Method unauthorized" })
  }
}