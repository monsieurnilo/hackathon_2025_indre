const express = require('express');
const MunicipalityService = require('./src/services/municipality_service');
const swaggerView = require('./swagger');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Get all municipalities from Indre
app.get('/api/municipalities/indre', async (req, res) => {
    try {
        const municipalities = await MunicipalityService.getMunicipalitiesFromIndre();
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all municipality codes from Indre
app.get('/api/municipalities/indre/codes', async (req, res) => {
    try {
        const codes = await MunicipalityService.getMunicipalityCodesFromIndre();
        res.json(codes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific municipality by code
app.get('/api/municipalities/:code', async (req, res) => {
    try {
        const municipality = await MunicipalityService.getMunicipalityByCode(req.params.code);
        res.json(municipality);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use("/api", swaggerView);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
