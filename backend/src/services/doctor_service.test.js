const axios = require('axios');
const DoctorService = require('./doctor_service');
const BaseDoctor = require('../models/baseDoctor');
const DoctorDetails = require('../models/doctorDetails');

// Mock axios
jest.mock('axios');

describe('DoctorService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getDoctorsByDepartment', () => {
        test('should return a list of doctors for a department', async () => {
            // Mock response data
            const mockResponse = {
                data: {
                    etablissements: [
                        {
                            siret: '12345678901234',
                            adresseEtablissement: {
                                codeCommuneEtablissement: '36001',
                                coordonneeLambertAbscisseEtablissement: '123456',
                                coordonneeLambertOrdonneeEtablissement: '654321'
                            }
                        },
                        {
                            siret: '98765432109876',
                            adresseEtablissement: {
                                codeCommuneEtablissement: '36002',
                                coordonneeLambertAbscisseEtablissement: '234567',
                                coordonneeLambertOrdonneeEtablissement: '765432'
                            }
                        }
                    ]
                }
            };

            // Setup axios mock
            axios.get.mockResolvedValue(mockResponse);

            // Call the service method
            const result = await DoctorService.getDoctorsByDepartment('36');

            // Assertions
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('codeCommuneEtablissement:36*'),
                expect.any(Object)
            );

            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(BaseDoctor);
            expect(result[0].siret).toBe('12345678901234');
            expect(result[0].codeCommune).toBe('36001');
            expect(result[0].coordonnees).toEqual({
                x: '123456',
                y: '654321'
            });
        });

        test('should throw an error when API call fails', async () => {
            // Setup axios mock to reject
            axios.get.mockRejectedValue(new Error('API Error'));

            // Assertions
            await expect(DoctorService.getDoctorsByDepartment('36')).rejects.toThrow(
                'Failed to fetch doctors for department 36'
            );
        });
    });

    describe('getDoctorDetailsByCode', () => {
        test('should return doctor details by code', async () => {
            // Mock response data
            const mockResponse = {
                data: {
                    etablissement: {
                        siret: '12345678901234',
                        uniteLegale: {
                            nomUniteLegale: 'Dupont',
                            prenom1UniteLegale: 'Jean',
                            denominationUniteLegale: 'Cabinet Médical Dr Dupont',
                        },
                        dateCreationEtablissement: '2010-01-15',
                        adresseEtablissement: {
                            codeCommuneEtablissement: '36001',
                            coordonneeLambertAbscisseEtablissement: '123456',
                            coordonneeLambertOrdonneeEtablissement: '654321',
                            numeroVoieEtablissement: '1',
                            typeVoieEtablissement: 'RUE',
                            libelleVoieEtablissement: 'DES LILAS',
                            libelleCommuneEtablissement: 'CHATEAUROUX'
                        }
                    }
                }
            };

            // Setup axios mock
            axios.get.mockResolvedValue(mockResponse);

            // Call the service method
            const result = await DoctorService.getDoctorDetailsByCode('12345678901234');

            // Assertions
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(
                'https://api.insee.fr/api-sirene/3.11/siret/12345678901234',
                expect.any(Object)
            );

            expect(result).toBeInstanceOf(DoctorDetails);
            expect(result.nom).toBe('Dupont');
            expect(result.prenom).toBe('Jean');
            expect(result.siret).toBe('12345678901234');
            expect(result.denomination).toBe('Cabinet Médical Dr Dupont');
            expect(result.codeCommune).toBe('36001');
            expect(result.coordonnees).toEqual({
                x: '123456',
                y: '654321'
            });
            expect(result.adresse).toBe('1 RUE DES LILAS CHATEAUROUX');
        });

        test('should throw an error when API call fails', async () => {
            // Setup axios mock to reject
            axios.get.mockRejectedValue(new Error('API Error'));

            // Assertions
            await expect(DoctorService.getDoctorDetailsByCode('12345678901234')).rejects.toThrow(
                'Failed to fetch doctor with code 12345678901234'
            );
        });
    });

    describe('getDoctorsFromIndre', () => {
        test('should return doctors from Indre department', async () => {
            // Mock the getDoctorsByDepartment method
            const mockDoctors = [
                new BaseDoctor({
                    siret: '12345678901234',
                    codeCommune: '36001',
                    coordonnees: { x: '123456', y: '654321' }
                })
            ];

            // Create a spy on getDoctorsByDepartment
            jest.spyOn(DoctorService, 'getDoctorsByDepartment').mockResolvedValue(mockDoctors);

            // Call the service method
            const result = await DoctorService.getDoctorsFromIndre();

            // Assertions
            expect(DoctorService.getDoctorsByDepartment).toHaveBeenCalledWith('36');
            expect(result).toEqual(mockDoctors);
        });

        test('should throw an error when getDoctorsByDepartment fails', async () => {
            // Setup mock to reject
            jest.spyOn(DoctorService, 'getDoctorsByDepartment').mockRejectedValue(
                new Error('Failed to fetch doctors')
            );

            // Assertions
            await expect(DoctorService.getDoctorsFromIndre()).rejects.toThrow(
                'Failed to fetch doctors from Indre'
            );
        });
    });
});