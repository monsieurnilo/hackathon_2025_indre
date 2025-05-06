const request = require('supertest');
// Import app directly
const doctorsRouter = require('./src/routes/doctors');
const municipalitiesRouter = require('./src/routes/municipalities');

// Mock the services used by the routers
jest.mock('./src/services/doctor_service', () => ({
    getDoctorsFromIndre: jest.fn().mockResolvedValue([{ siret: '12345678901234' }]),
    getDoctorDetailsByCode: jest.fn().mockResolvedValue({ siret: '12345678901234', nom: 'Test Doctor' })
}));

jest.mock('./src/services/municipality_service', () => ({
    getMunicipalitiesFromIndre: jest.fn().mockResolvedValue([{ code: '36001', nom: 'Test Municipality' }]),
    getMunicipalityCodesFromIndre: jest.fn().mockResolvedValue(['36001', '36002']),
    getMunicipalityByCode: jest.fn().mockResolvedValue({ code: '36001', nom: 'Test Municipality' })
}));

// Mock console.log to avoid output during tests
jest.spyOn(console, 'log').mockImplementation(() => { });

describe('API Routes', () => {
    let app;

    beforeAll(() => {
        // Create a simple express app for testing
        const express = require('express');
        app = express();

        // Use the real routers
        app.use('/api/doctors', doctorsRouter);
        app.use('/api/municipalities', municipalitiesRouter);
    });

    describe('Doctor Routes', () => {
        test('GET /api/doctors/indre should return doctors from Indre', async () => {
            const response = await request(app).get('/api/doctors/indre');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ siret: '12345678901234' }]);
        });

        test('GET /api/doctors/:code should return a specific doctor', async () => {
            const response = await request(app).get('/api/doctors/12345678901234');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ siret: '12345678901234', nom: 'Test Doctor' });
        });
    });

    describe('Municipality Routes', () => {
        test('GET /api/municipalities/indre should return municipalities from Indre', async () => {
            const response = await request(app).get('/api/municipalities/indre');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ code: '36001', nom: 'Test Municipality' }]);
        });

        test('GET /api/municipalities/indre/codes should return municipality codes', async () => {
            const response = await request(app).get('/api/municipalities/indre/codes');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(['36001', '36002']);
        });

        test('GET /api/municipalities/:code should return a specific municipality', async () => {
            const response = await request(app).get('/api/municipalities/36001');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ code: '36001', nom: 'Test Municipality' });
        });
    });
});