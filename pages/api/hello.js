// pages/api/Products/GetAll.js



export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Dış API'ye istek yapılıyor
      const response = await fetch('https://localhost:7039/api/Products/GetAll');
      const data = response.data;h

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching data from the external API' });
    }
  } else {
    res.status(405).json({ error: 'Only GET requests are allowed' });
  }
}
