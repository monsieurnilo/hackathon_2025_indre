const request = require('supertest');
const express = require('express');
const MunicipalityService = require('./src/services/municipality_service');

// Mock municipality service
jest.mock('../src/services/municipality_service');

// Create Express app
const app = express();

// Import routes
app.get('/api/municipalities/indre', async (req, res) => {
    try {
        const municipalities = await MunicipalityService.getMunicipalitiesFromIndre();
        res.json(municipalities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/municipalities/indre/codes', async (req, res) => {
    try {
        const codes = await MunicipalityService.getMunicipalityCodesFromIndre();
        res.json(codes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/municipalities/:code', async (req, res) => {
    try {
        const municipality = await MunicipalityService.getMunicipalityByCode(req.params.code);
        res.json(municipality);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

describe('API Endpoints', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/municipalities/indre', () => {
        test('should return municipalities from Indre', async () => {
            const mockMunicipalities = [
                { nom: 'Commune 1', code: '36001' },
                { nom: 'Commune 2', code: '36002' }
            ];

            MunicipalityService.getMunicipalitiesFromIndre.mockResolvedValueOnce(mockMunicipalities);

            const response = await request(app)
                .get('/api/municipalities/indre');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMunicipalities);
            expect(MunicipalityService.getMunicipalitiesFromIndre).toHaveBeenCalled();
        });

        test('should handle errors', async () => {
            MunicipalityService.getMunicipalitiesFromIndre.mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .get('/api/municipalities/indre');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Test error');
        });
    });

    describe('GET /api/municipalities/indre/codes', () => {
        test('should return municipality codes from Indre', async () => {
            const mockCodes = ['36001', '36002', '36003'];

            MunicipalityService.getMunicipalityCodesFromIndre.mockResolvedValueOnce(mockCodes);

            const response = await request(app)
                .get('/api/municipalities/indre/codes');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCodes);
            expect(MunicipalityService.getMunicipalityCodesFromIndre).toHaveBeenCalled();
        });

        test('should handle errors', async () => {
            MunicipalityService.getMunicipalityCodesFromIndre.mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .get('/api/municipalities/indre/codes');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Test error');
        });
    });

    describe('GET /api/municipalities/:code', () => {
        test('should return a specific municipality by code', async () => {
            const mockMunicipality = { nom: 'Commune 1', code: '36001' };

            MunicipalityService.getMunicipalityByCode.mockResolvedValueOnce(mockMunicipality);

            const response = await request(app)
                .get('/api/municipalities/36001');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMunicipality);
            expect(MunicipalityService.getMunicipalityByCode).toHaveBeenCalledWith('36001');
        });

        test('should handle errors', async () => {
            MunicipalityService.getMunicipalityByCode.mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .get('/api/municipalities/36001');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Test error');
        });
    });
});