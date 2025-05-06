const axios = require('axios');
const Municipality = require('../models/municipality');

class MunicipalityService {
    /**
     * Base URL for geo.api.gouv.fr
     */
    static BASE_URL = 'https://geo.api.gouv.fr';

    /**
     * Get all municipalities from Indre
     * @param {string} departementCode - Department code (e.g., '36' for Indre)
     * @returns {Promise<Municipality[]>} - Array of Municipality objects
     */
    static async getMunicipalitiesByDepartment(departementCode) {
        try {
            const response = await axios.get(`${this.BASE_URL}/departements/${departementCode}/communes`);
            return response.data.map(item => Municipality.fromJson({
                nom: item.nom,
                code: item.code,
                codeDepartement: item.codeDepartement,
                siren: item.siren,
                codeEpci: item.codeEpci,
                codeRegion: item.codeRegion,
                codesPostaux: item.codesPostaux || [],
                population: item.population
            }));
        } catch (error) {
            console.error(`Error fetching municipalities for department ${departementCode}:`, error.message);
            throw new Error(`Failed to fetch municipalities for department ${departementCode}`);
        }
    }

    /**
     * Get all municipality codes from Indre
     * @param {string} departementCode - Department code (e.g., '36' for Indre)
     * @returns {Promise<string[]>} - Array of municipality codes
     */
    static async getMunicipalityCodesByDepartment(departementCode) {
        try {
            const municipalities = await this.getMunicipalitiesByDepartment(departementCode);
            return municipalities.map(municipality => municipality.code);
        } catch (error) {
            console.error(`Error fetching municipality codes for department ${departementCode}:`, error.message);
            throw new Error(`Failed to fetch municipality codes for department ${departementCode}`);
        }
    }

    /**
     * Get a municipality by its code
     * @param {string} code - Municipality code
     * @returns {Promise<Municipality>} - Municipality object
     */
    static async getMunicipalityByCode(code) {
        try {
            const response = await axios.get(`${this.BASE_URL}/communes/${code}`);
            return Municipality.fromJson({
                nom: response.data.nom,
                code: response.data.code,
                codeDepartement: response.data.codeDepartement,
                siren: response.data.siren,
                codeEpci: response.data.codeEpci,
                codeRegion: response.data.codeRegion,
                codesPostaux: response.data.codesPostaux || [],
                population: response.data.population
            });
        } catch (error) {
            console.error(`Error fetching municipality with code ${code}:`, error.message);
            throw new Error(`Failed to fetch municipality with code ${code}`);
        }
    }

    /**
     * Get all municipalities from Indre with their codes
     * @returns {Promise<Municipality[]>} - Array of Municipality objects with codes
     */
    static async getMunicipalitiesFromIndre() {
        try {
            const municipalities = await this.getMunicipalitiesByDepartment('36'); // Indre department code
            return municipalities;
        } catch (error) {
            console.error('Error fetching municipalities from Indre:', error.message);
            throw new Error('Failed to fetch municipalities from Indre');
        }
    }

    /**
     * Get all municipality codes from Indre
     * @returns {Promise<string[]>} - Array of municipality codes
     */
    static async getMunicipalityCodesFromIndre() {
        try {
            const codes = await this.getMunicipalityCodesByDepartment('36'); // Indre department code
            return codes;
        } catch (error) {
            console.error('Error fetching municipality codes from Indre:', error.message);
            throw new Error('Failed to fetch municipality codes from Indre');
        }
    }
}
module.exports = MunicipalityService;