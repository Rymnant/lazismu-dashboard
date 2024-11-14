import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ message: 'Hello, this is a GET request!' });
  } else if (req.method === 'POST') {
    // Handle POST request
    const data = req.body;
    res.status(200).json({ message: 'Hello, this is a POST request!', data });
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}