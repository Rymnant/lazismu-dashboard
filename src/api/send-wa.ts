import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumbers, message } = req.body;

    try {
      const promises = phoneNumbers.map((number: string) =>
        client.messages.create({
          body: message,
          from: 'whatsapp:+14155238886', // Twilio sandbox number
          to: `whatsapp:${number}`,
        })
      );

      await Promise.all(promises);

      res.status(200).json({ success: true, message: 'Messages sent successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send messages', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}