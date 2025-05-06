// File: commune.js
// Description: Model representing a French commune/municipality


/**
 * @swagger
 * components:
 *  schemas:
 *    Municipality:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Nom
 *        code:
 *          type: string
 *          description: Code
 *        codeDepartement:
 *          type: string
 *          description: Code departement
 *        siren:
 *          type: string
 *          description: Siren
 *        codeEpci:
 *          type: string
 *          description: Code EPCI
 *        codeRegion:
 *          type: string
 *          description: Code region
 *        codesPostaux:
 *          type: array
 *          description: Codes postaux
 *        population:
 *          type: number
 *          description: Population
 */
class Municipality {
    /**
     * Create a Commune instance
     * @param {Object} data - Commune data
     * @param {string} data.nom - Name of the commune
     * @param {string} data.code - Commune code (INSEE code)
     * @param {string} data.codeDepartement - Department code
     * @param {string} data.siren - SIREN identifier
     * @param {string} data.codeEpci - EPCI code (Établissement public de coopération intercommunale)
     * @param {string} data.codeRegion - Region code
     * @param {string[]} data.codesPostaux - Array of postal codes
     * @param {number} data.population - Population count
     */
    constructor({
        nom,
        code,
        codeDepartement,
        siren,
        codeEpci,
        codeRegion,
        codesPostaux,
        population
    }) {
        this.nom = nom;
        this.code = code;
        this.codeDepartement = codeDepartement;
        this.siren = siren;
        this.codeEpci = codeEpci;
        this.codeRegion = codeRegion;
        this.codesPostaux = codesPostaux;
        this.population = population;
    }

    /**
     * Create a Commune from JSON data
     * @param {Object} jsonData - JSON representation of a commune
     * @returns {Municipality} - New Commune instance
     */
    static fromJson(jsonData) {
        return new Municipality(jsonData);
    }

    /**
     * Convert Commune to JSON representation
     * @returns {Object} - JSON representation
     */
    toJson() {
        return {
            nom: this.nom,
            code: this.code,
            codeDepartement: this.codeDepartement,
            siren: this.siren,
            codeEpci: this.codeEpci,
            codeRegion: this.codeRegion,
            codesPostaux: this.codesPostaux,
            population: this.population
        };
    }
}

module.exports = Municipality;
