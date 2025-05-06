const express = require('express');
const MunicipalityService = require('../services/municipality_service');
const router = express.Router();

// Get all municipalities from Indre
/**
 * @swagger
 * /api/municipalities/indre:
 *   get:
 *     summary: Get all municipalities from Indre
 *     description: Get all municipalities from Indre
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Municipality'
 */
router.get('/indre', async (req, res) => {
  try {
      const municipalities = await MunicipalityService.getMunicipalitiesFromIndre();
      res.json(municipalities);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all municipality codes from Indre
/**
 * @swagger
 * /api/municipalities/indre/codes:
 *   get:
 *     summary: Get all municipality codes from Indre
 *     description: Get all municipality codes from Indre
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/indre/codes', async (req, res) => {
  try {
      const codes = await MunicipalityService.getMunicipalityCodesFromIndre();
      res.json(codes);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get a specific municipality by code
/**
 * @swagger
 * /api/municipalities/{code}:
 *   get:
 *     summary: Get a municipality by its code
 *     description: Get a municipality by its code
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Municipality code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Municipality'
 */
router.get('/:code', async (req, res) => {
  try {
      const municipality = await MunicipalityService.getMunicipalityByCode(req.params.code);
      res.json(municipality);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
