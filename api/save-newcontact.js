export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    try {
      const shop = 'wteraz-01.myshopify.com';
      const accessToken = process.env.SHOPIFY_ADMIN_TOKEN;

      const response = await fetch(`https://${shop}/admin/api/2023-07/customers.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({
          customer: {
            first_name: name,
            email: email,
            tags: 'Submitted via app',
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ message: 'Contact saved to Shopify!', customer: data.customer });
      } else {
        return res.status(response.status).json({ error: data });
      }

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

