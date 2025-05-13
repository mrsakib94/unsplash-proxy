const axios = require('axios');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow all origins

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get('/api/photos', async (req, res) => {
  try {
    const params = {
      count: req.query.count || 10,
    };

    // Only add query if it exists
    if (req.query.query) params.query = req.query.query;

    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params,
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching from Unsplash');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
