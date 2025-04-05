const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const shopifyDomain = 'wteraz-01.myshopify.com';
  const accessToken = process.env.SHOPIFY_ADMIN_TOKEN;

  const shopifyUrl = `https://${shopifyDomain}/admin/api/2023-10/customers.json`;

  const body = {
    customer: {
      first_name: name,
      email: email,
      tags: 'Contact Form Submission'
    }
  };

  try {
    const response = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors || 'Unknown error' });
    }

    return res.status(200).json({ success: true, customer: data.customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};