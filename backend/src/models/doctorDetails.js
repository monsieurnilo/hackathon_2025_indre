// File: doctorDetails.js
// Description: Model representing a French doctorDetails/doctorDetails

/**
 * @swagger
 * components:
 *  schemas:
 *    DoctorDetails:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Nom
 *        siret:
 *          type: string
 *          description: Siret
 *        codeCommune:
 *          type: string
 *          description: Commune code
 *        coordonnees:
 *          type: object
 *          properties:
 *            x:
 *              type: string
 *              description: X coordonnee
 *            y:
 *              type: string
 *              description: Y coordonnee
 *        adresse:
 *          type: string
 *          description: Adresse
 *        denomination:
 *          type: string
 *          description: Denomination
 *        prenom:
 *          type: string
 *          description: Prenom
 *        creationEtablissement:
 *          type: string
 *          description: Creation etablissement
 */
class DoctorDetails {
  /**
   * Create a DoctorDetails instance
   * @param {Object} data - DoctorDetails data
   * @param {string} data.nom - Name of the DoctorDetails
   * @param {string} data.siret - Siret
   * @param {string} data.codeCommune - Commune code
   * @param {Object} data.coordonnees - Coordonnees
   * @param {string} data.coordonnees.x - X coordonnee
   * @param {string} data.coordonnees.y - Y coordonnee
   * @param {string} data.epciCode - EPCI code (Établissement public de coopération intercommunale)
   * @param {string} data.epciName - EPCI name
   * @param {string} data.adresse - Adresse
   * @param {string} data.prenom - Prenom
   * @param {string} data.denomination - Denomination
   * @param {string} data.creationEtablissement - Creation etablissement
   */
  constructor({
      nom,
      siret,
      codeCommune,
      epciCode,
      epciName,
      coordonnees,
      adresse,
      denomination,
      prenom,
      creationEtablissement
  }) {
      this.nom = nom;
      this.siret = siret
      this.codeCommune = codeCommune
      this.epciCode = epciCode;
      this.epciName = epciName;
      this.coordonnees = coordonnees
      this.adresse = adresse
      this.denomination = denomination
      this.prenom = prenom
      this.creationEtablissement = creationEtablissement
  }

  /**
   * Create a DoctorDetails from JSON data
   * @param {Object} jsonData - JSON representation of a doctorDetails
   * @returns {DoctorDetails} - New DoctorDetails instance
   */
  static fromJson(jsonData) {
      return new DoctorDetails(jsonData);
  }

  /**
   * Convert DoctorDetails to JSON representation
   * @returns {Object} - JSON representation
   */
  toJson() {
      return {
          nom: this.nom,
          siret: this.siret,
          codeCommune: this.codeCommune,
          coordonnees: this.coordonnees,
          adresse: this.adresse,
          telephone : this.telephone,
      };
  }
}

module.exports = DoctorDetails;
