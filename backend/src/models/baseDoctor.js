// File: doctor.js
// Description: Model representing a French doctor/doctor

class BaseDoctor {
  /**
   * Create a Doctor instance
   * @param {Object} data - Doctor data
   * @param {string} data.siret - Siret
   * @param {string} data.codeCommune - Commune code
   * @param {Object} data.coordonnees - Coordonnees
   * @param {string} data.coordonnees.x - X coordonnee
   * @param {string} data.coordonnees.y - Y coordonnee
   */
  constructor({
      nom,
      siret,
      codeCommune,
      coordonnees,
  }) {
      this.nom = nom;
      this.siret = siret
      this.codeCommune = codeCommune
      this.coordonnees = coordonnees
  }

  /**
   * Create a Doctor from JSON data
   * @param {Object} jsonData - JSON representation of a doctor
   * @returns {Doctor} - New Doctor instance
   */
  static fromJson(jsonData) {
      return new BaseDoctor(jsonData);
  }

  /**
   * Convert Doctor to JSON representation
   * @returns {Object} - JSON representation
   */
  toJson() {
      return {
          siret: this.siret,
          codeCommune: this.codeCommune,
          coordonnees: this.coordonnees,
      };
  }
}

module.exports = BaseDoctor;
