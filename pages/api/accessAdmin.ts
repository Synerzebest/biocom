import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { password } = req.query;
    const adminPassword = process.env.ADMIN_PASS;

    if (typeof password === 'string' && password === adminPassword) {
        const token = jwt.sign({isAdmin: true}, process.env.JWT_SECRET, {
            expiresIn: '30m'
        })
        res.status(200).json({ success: true, token });
    } else {
        res.status(401).json({ success: false });
    }
}