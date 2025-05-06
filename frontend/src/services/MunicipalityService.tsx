import axios from 'axios';
import type { Municipality } from '../interfaces/Municipality';

class MunicipalityService {
    private static baseUrl = typeof process !== 'undefined' && process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL
        : 'http://localhost:3000/api';

    /**
     * Get all municipalities from Indre
     * @returns {Promise<Municipality[]>} Array of Municipality objects
     */
    public static async getMunicipalitiesFromIndre(): Promise<Municipality[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/municipalities/indre`);
            return response.data;
        } catch (error) {
            console.error('Error fetching municipalities from Indre:', error);
            throw new Error('Failed to fetch municipalities from Indre');
        }
    }

    /**
     * Get all municipality codes from Indre
     * @returns {Promise<string[]>} Array of municipality codes
     */
    public static async getMunicipalityCodesFromIndre(): Promise<string[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/municipalities/indre/codes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching municipality codes from Indre:', error);
            throw new Error('Failed to fetch municipality codes from Indre');
        }
    }

    /**
     * Get a municipality by its code
     * @param {string} code Municipality code
     * @returns {Promise<Municipality>} Municipality object
     */
    public static async getMunicipalityByCode(code: string): Promise<Municipality> {
        try {
            const response = await axios.get(`${this.baseUrl}/municipalities/${code}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching municipality with code ${code}:`, error);
            throw new Error(`Failed to fetch municipality with code ${code}`);
        }
    }
}

export default MunicipalityService;