const request = require('supertest');
const express = require('express');
const DoctorService = require('../services/doctor_service');
const doctorsRouter = require('./doctors');
const BaseDoctor = require('../models/baseDoctor');
const DoctorDetails = require('../models/doctorDetails');

// Mock DoctorService
jest.mock('../services/doctor_service');

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/doctors', doctorsRouter);

describe('Doctors API Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/doctors/indre', () => {
        test('should return all doctors from Indre', async () => {
            // Mock data
            const mockDoctors = [
                new BaseDoctor({
                    siret: '12345678901234',
                    codeCommune: '36001',
                    coordonnees: { x: '123456', y: '654321' }
                }),
                new BaseDoctor({
                    siret: '98765432109876',
                    codeCommune: '36002',
                    coordonnees: { x: '234567', y: '765432' }
                })
            ];

            // Setup mock
            DoctorService.getDoctorsFromIndre.mockResolvedValue(mockDoctors);

            // Make request
            const response = await request(app).get('/api/doctors/indre');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].siret).toBe('12345678901234');
            expect(DoctorService.getDoctorsFromIndre).toHaveBeenCalledTimes(1);
        });

        test('should return 500 when service throws an error', async () => {
            // Setup mock
            DoctorService.getDoctorsFromIndre.mockRejectedValue(
                new Error('Failed to fetch doctors')
            );

            // Make request
            const response = await request(app).get('/api/doctors/indre');

            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Failed to fetch doctors');
        });
    });

    describe('GET /api/doctors/:code', () => {
        test('should return a specific doctor by code', async () => {
            // Mock data
            const mockDoctor = new DoctorDetails({
                nom: 'Dupont',
                prenom: 'Jean',
                siret: '12345678901234',
                codeCommune: '36001',
                coordonnees: { x: '123456', y: '654321' },
                adresse: '1 rue de Paris'
            });

            // Setup mock
            DoctorService.getDoctorDetailsByCode.mockResolvedValue(mockDoctor);

            // Make request
            const response = await request(app).get('/api/doctors/12345678901234');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body.nom).toBe('Dupont');
            expect(response.body.siret).toBe('12345678901234');
            expect(DoctorService.getDoctorDetailsByCode).toHaveBeenCalledWith('12345678901234');
        });

        test('should return 500 when service throws an error', async () => {
            // Setup mock
            DoctorService.getDoctorDetailsByCode.mockRejectedValue(
                new Error('Failed to fetch doctor with code 12345678901234')
            );

            // Make request
            const response = await request(app).get('/api/doctors/12345678901234');

            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Failed to fetch doctor with code 12345678901234');
        });
    });
});