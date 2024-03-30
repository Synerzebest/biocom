import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const id = req.query.id as string; // Get location id

        const url = process.env.MONGODB_URI || '';

        if (!url) {
            return res.status(500).json({ message: 'MongoDB URI is not defined' });
        }

        try {
            const client = await MongoClient.connect(url);
            const db = client.db('database');

            // Get selected location from unvalidated-locations collection
            const unvalidatedLocation = await db.collection('unvalidated-locations').findOne({ _id: ObjectId });

            if (!unvalidatedLocation) {
                return res.status(404).json({ message: 'Unvalidated location not found' });
            }

            // Insert validated location
            await db.collection('locations').insertOne(unvalidatedLocation);

            // Remove the location from the unvalidated-locations collection
            await db.collection('unvalidated-locations').deleteOne({ _id: ObjectId });

            await client.close();

            return res.status(200).json({ message: 'Location validated successfully' });
        } catch (error) {
            console.error('Error validating location:', error);
            return res.status(500).json({ message: 'Error validating location' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
