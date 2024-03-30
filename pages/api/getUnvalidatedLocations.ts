import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

let cachedDb: any = null;

export const config = {
    api: {
        responseLimit: false
    }
}

async function connectToDatabase(uri: string) {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('database');
    cachedDb = db;
    return db;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "GET") {
        const url = process.env.MONGODB_URI || "";

        if (!url) {
            throw new Error("Mongodb url is undefined");
        }

        try {
            const db = await connectToDatabase(url);
            const unvalidatedLocations = await db.collection('unvalidated-locations').find().toArray();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(unvalidatedLocations);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            res.status(500).json({ message: 'Error connecting to MongoDB' });
        }
    } else {
        console.log("Method unauthorized")
    }
}