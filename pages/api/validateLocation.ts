import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

interface LocationData {
  id: string;
  validate: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const url = process.env.MONGODB_URI || "";

    if (!url) {
      throw new Error("Mongodb url is undefined");
    }

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Location ID is required' });
    }

    let client;

    try {
      client = await MongoClient.connect(url);
      const db = client.db('database');

      const locationId = id.toString();

      const existingLocation = await db.collection('locations').findOne({ id: locationId });

      if (!existingLocation) {
        return res.status(404).json({ message: 'Location not found' });
      }

      await db.collection('locations').updateOne(
        { id: locationId },
        { $set: { validate: true } }
      );

      res.status(200).json({ message: 'Location validation status updated successfully' });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while updating the location validation status' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(400).json({ message: "Method unauthorized" });
  }
}
