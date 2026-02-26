const express = require('express');
const cors = require('cors');
const SneaksAPI = require('sneaks-api');

const app = express();
const sneaks = new SneaksAPI();

app.use(cors());

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Sneaks local API is running' });
});

// Search endpoint
app.get('/api/sneakers/search', (req, res) => {
    const query = req.query.query || 'jordan';
    const limit = parseInt(req.query.limit) || 10;

    console.log(`Searching for: ${query} (limit ${limit})`);

    sneaks.getProducts(query, limit, (err, products) => {
        if (err || !products) {
            console.error("SneaksAPI error:", err);
            return res.status(500).json({ error: 'Failed to fetch sneakers', details: err });
        }
        res.json(products);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sneaker Backend Server running on http://localhost:${PORT}`);
});
