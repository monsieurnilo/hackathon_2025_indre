const express = require('express');
const DoctorService = require('../services/doctor_service');
const router = express.Router();

/**
 * @swagger
 * /api/doctors/indre:
 *   get:
 *     summary: Get all doctors from Indre
 *     description: Get all doctors from Indre
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
 *                 $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/indre', async (req, res) => {
  try {
      const doctors = await DoctorService.getDoctorsFromIndre();
      res.json(doctors);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/doctors/{code}:
 *   get:
 *     summary: Get a doctor by its code
 *     description: Get a doctor by its code
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: code
 *         description: Doctor code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:code', async (req, res) => {
  try {
      const doctor = await DoctorService.getDoctorDetailsByCode(req.params.code);
      res.json(doctor);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
