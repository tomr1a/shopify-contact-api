// api/save-contact.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    // Simulate saving the contact
    console.log('Received contact:', name, email);

    res.status(200).json({ message: 'Contact saved!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
