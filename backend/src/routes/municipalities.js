const express = require('express');
const MunicipalityService = require('../services/municipality_service');
const router = express.Router();

// Get all municipalities from Indre
router.get('/indre', async (req, res) => {
  try {
      const municipalities = await MunicipalityService.getMunicipalitiesFromIndre();
      res.json(municipalities);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all municipality codes from Indre
router.get('/indre/codes', async (req, res) => {
  try {
      const codes = await MunicipalityService.getMunicipalityCodesFromIndre();
      res.json(codes);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get a specific municipality by code
router.get('/:code', async (req, res) => {
  try {
      const municipality = await MunicipalityService.getMunicipalityByCode(req.params.code);
      res.json(municipality);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
