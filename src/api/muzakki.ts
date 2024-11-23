// src/api/muzakki.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Muzakki from '../models/Muzakki';
import sequelize from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await sequelize.sync(); // Sinkronisasi model dengan database

  if (req.method === 'GET') {
    try {
      const muzakkiList = await Muzakki.findAll();
      res.status(200).json(muzakkiList);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, phoneNumber, gender, age, occupation, donationType, donorType, year } = req.body;
      const newMuzakki = await Muzakki.create({ name, phoneNumber, gender, age, occupation, donationType, donorType, year });
      res.status(201).json(newMuzakki);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}