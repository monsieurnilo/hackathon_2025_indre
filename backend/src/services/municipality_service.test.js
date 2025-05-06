const axios = require('axios');
const MunicipalityService = require('./municipality_service');
const Municipality = require('../models/municipality');

// Mock axios
jest.mock('axios');

describe('MunicipalityService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getMunicipalitiesByDepartment', () => {
        test('should return array of Municipality objects on successful API call', async () => {
            // Mock data
            const mockResponse = {
                data: [
                    {
                        nom: 'Test Commune',
                        code: '36001',
                        codeDepartement: '36',
                        siren: '123456789',
                        codeEpci: 'E123',
                        codeRegion: 'R01',
                        codesPostaux: ['36000'],
                        population: 5000
                    }
                ]
            };

            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await MunicipalityService.getMunicipalitiesByDepartment('36');

            expect(axios.get).toHaveBeenCalledWith('https://geo.api.gouv.fr/departements/36/communes');
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(Municipality);
            expect(result[0].nom).toBe('Test Commune');
            expect(result[0].code).toBe('36001');
        });

        test('should handle missing codesPostaux in API response', async () => {
            const mockResponse = {
                data: [
                    {
                        nom: 'Test Commune',
                        code: '36001',
                        codeDepartement: '36',
                        siren: '123456789',
                        codeEpci: 'E123',
                        codeRegion: 'R01',
                        population: 5000
                        // codesPostaux is missing
                    }
                ]
            };

            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await MunicipalityService.getMunicipalitiesByDepartment('36');

            expect(result[0].codesPostaux).toEqual([]);
        });

        test('should throw error when API call fails', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(MunicipalityService.getMunicipalitiesByDepartment('36'))
                .rejects
                .toThrow('Failed to fetch municipalities for department 36');
        });
    });

    describe('getMunicipalityCodesByDepartment', () => {
        test('should return array of municipality codes', async () => {
            // Mock the dependency function
            const mockMunicipalities = [
                new Municipality({
                    nom: 'Test Commune 1',
                    code: '36001',
                    codeDepartement: '36',
                    siren: '123456789',
                    codeEpci: 'E123',
                    codeRegion: 'R01',
                    codesPostaux: ['36000'],
                    population: 5000
                }),
                new Municipality({
                    nom: 'Test Commune 2',
                    code: '36002',
                    codeDepartement: '36',
                    siren: '987654321',
                    codeEpci: 'E123',
                    codeRegion: 'R01',
                    codesPostaux: ['36010'],
                    population: 3000
                })
            ];

            // Spy on getMunicipalitiesByDepartment and mock its implementation
            jest.spyOn(MunicipalityService, 'getMunicipalitiesByDepartment').mockResolvedValueOnce(mockMunicipalities);

            const result = await MunicipalityService.getMunicipalityCodesByDepartment('36');

            expect(MunicipalityService.getMunicipalitiesByDepartment).toHaveBeenCalledWith('36');
            expect(result).toEqual(['36001', '36002']);
        });

        test('should throw error when getMunicipalitiesByDepartment fails', async () => {
            jest.spyOn(MunicipalityService, 'getMunicipalitiesByDepartment')
                .mockRejectedValueOnce(new Error('Test error'));

            await expect(MunicipalityService.getMunicipalityCodesByDepartment('36'))
                .rejects
                .toThrow('Failed to fetch municipality codes for department 36');
        });
    });

    // ...existing code...

    describe('getMunicipalityByCode', () => {
        test('should return a Municipality object on successful API call', async () => {
            const mockResponse = {
                data: {
                    nom: 'Test Commune',
                    code: '36001',
                    codeDepartement: '36',
                    siren: '123456789',
                    codeEpci: 'E123',
                    codeRegion: 'R01',
                    codesPostaux: ['36000'],
                    population: 5000
                }
            };

            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await MunicipalityService.getMunicipalityByCode('36001');

            expect(axios.get).toHaveBeenCalledWith('https://geo.api.gouv.fr/communes/36001');
            expect(result).toBeInstanceOf(Municipality);
            expect(result.nom).toBe('Test Commune');
            expect(result.code).toBe('36001');
            expect(result.codeDepartement).toBe('36');
            expect(result.population).toBe(5000);
        });

        test('should handle missing codesPostaux in API response', async () => {
            const mockResponse = {
                data: {
                    nom: 'Test Commune',
                    code: '36001',
                    codeDepartement: '36',
                    siren: '123456789',
                    codeEpci: 'E123',
                    codeRegion: 'R01',
                    population: 5000
                    // codesPostaux is missing
                }
            };

            axios.get.mockResolvedValueOnce(mockResponse);

            const result = await MunicipalityService.getMunicipalityByCode('36001');

            expect(result.codesPostaux).toEqual([]);
        });

        test('should throw error when API call fails', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(MunicipalityService.getMunicipalityByCode('36001'))
                .rejects
                .toThrow('Failed to fetch municipality with code 36001');
        });
    });

    describe('getMunicipalitiesFromIndre', () => {
        test('should call getMunicipalitiesByDepartment with code 36', async () => {
            const mockMunicipalities = [
                new Municipality({
                    nom: 'Test Commune 1',
                    code: '36001',
                    codeDepartement: '36'
                }),
                new Municipality({
                    nom: 'Test Commune 2',
                    code: '36002',
                    codeDepartement: '36'
                })
            ];

            jest.spyOn(MunicipalityService, 'getMunicipalitiesByDepartment')
                .mockResolvedValueOnce(mockMunicipalities);

            const result = await MunicipalityService.getMunicipalitiesFromIndre();

            expect(MunicipalityService.getMunicipalitiesByDepartment).toHaveBeenCalledWith('36');
            expect(result).toEqual(mockMunicipalities);
        });

        test('should throw error when getMunicipalitiesByDepartment fails', async () => {
            jest.spyOn(MunicipalityService, 'getMunicipalitiesByDepartment')
                .mockRejectedValueOnce(new Error('Test error'));

            await expect(MunicipalityService.getMunicipalitiesFromIndre())
                .rejects
                .toThrow('Failed to fetch municipalities from Indre');
        });
    });

    describe('getMunicipalityCodesFromIndre', () => {
        test('should call getMunicipalityCodesByDepartment with code 36', async () => {
            const mockCodes = ['36001', '36002', '36003'];

            jest.spyOn(MunicipalityService, 'getMunicipalityCodesByDepartment')
                .mockResolvedValueOnce(mockCodes);

            const result = await MunicipalityService.getMunicipalityCodesFromIndre();

            expect(MunicipalityService.getMunicipalityCodesByDepartment).toHaveBeenCalledWith('36');
            expect(result).toEqual(mockCodes);
        });

        test('should throw error when getMunicipalityCodesByDepartment fails', async () => {
            jest.spyOn(MunicipalityService, 'getMunicipalityCodesByDepartment')
                .mockRejectedValueOnce(new Error('Test error'));

            await expect(MunicipalityService.getMunicipalityCodesFromIndre())
                .rejects
                .toThrow('Failed to fetch municipality codes from Indre');
        });
    });
});