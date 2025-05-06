const request = require('supertest');
const express = require('express');
const MunicipalityService = require('../services/municipality_service');
const municipalitiesRouter = require('./municipalities');

// Mock MunicipalityService
jest.mock('../services/municipality_service');

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/municipalities', municipalitiesRouter);

describe('Municipalities API Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/municipalities/indre', () => {
        test('should return all municipalities from Indre', async () => {
            // Mock data
            const mockMunicipalities = [
                { code: '36001', nom: 'Aigurande', population: 1500 },
                { code: '36002', nom: 'Ardentes', population: 3700 }
            ];

            // Setup mock
            MunicipalityService.getMunicipalitiesFromIndre.mockResolvedValue(mockMunicipalities);

            // Make request
            const response = await request(app).get('/api/municipalities/indre');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].code).toBe('36001');
            expect(response.body[0].nom).toBe('Aigurande');
            expect(MunicipalityService.getMunicipalitiesFromIndre).toHaveBeenCalledTimes(1);
        });

        test('should return 500 when service throws an error', async () => {
            // Setup mock
            MunicipalityService.getMunicipalitiesFromIndre.mockRejectedValue(
                new Error('Failed to fetch municipalities')
            );

            // Make request
            const response = await request(app).get('/api/municipalities/indre');

            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Failed to fetch municipalities');
        });
    });

    describe('GET /api/municipalities/indre/codes', () => {
        test('should return all municipality codes from Indre', async () => {
            // Mock data
            const mockCodes = ['36001', '36002', '36003'];

            // Setup mock
            MunicipalityService.getMunicipalityCodesFromIndre.mockResolvedValue(mockCodes);

            // Make request
            const response = await request(app).get('/api/municipalities/indre/codes');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(3);
            expect(response.body).toContain('36001');
            expect(response.body).toContain('36002');
            expect(MunicipalityService.getMunicipalityCodesFromIndre).toHaveBeenCalledTimes(1);
        });

        test('should return 500 when service throws an error', async () => {
            // Setup mock
            MunicipalityService.getMunicipalityCodesFromIndre.mockRejectedValue(
                new Error('Failed to fetch municipality codes')
            );

            // Make request
            const response = await request(app).get('/api/municipalities/indre/codes');

            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Failed to fetch municipality codes');
        });
    });

    describe('GET /api/municipalities/:code', () => {
        test('should return a specific municipality by code', async () => {
            // Mock data
            const mockMunicipality = {
                code: '36001',
                nom: 'Aigurande',
                population: 1500,
                coordonnees: { latitude: 46.4333, longitude: 1.8333 }
            };

            // Setup mock
            MunicipalityService.getMunicipalityByCode.mockResolvedValue(mockMunicipality);

            // Make request
            const response = await request(app).get('/api/municipalities/36001');

            // Assertions
            expect(response.status).toBe(200);
            expect(response.body.code).toBe('36001');
            expect(response.body.nom).toBe('Aigurande');
            expect(MunicipalityService.getMunicipalityByCode).toHaveBeenCalledWith('36001');
        });

        test('should return 500 when service throws an error', async () => {
            // Setup mock
            MunicipalityService.getMunicipalityByCode.mockRejectedValue(
                new Error('Failed to fetch municipality with code 36001')
            );

            // Make request
            const response = await request(app).get('/api/municipalities/36001');

            // Assertions
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Failed to fetch municipality with code 36001');
        });
    });
});