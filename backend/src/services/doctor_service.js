const axios = require("axios");
const BaseDoctor = require("../models/baseDoctor");
const DoctorDetails = require("../models/doctorDetails");
require("dotenv").config();

class DoctorService {
  /**
   * Base URL for geo.api.gouv.fr
   */
  static BASE_URL = "https://api.insee.fr/api-sirene/3.11/siret";

  /**
   * Get all doctors from Indre
   * @param {string} departementCode - Department code (e.g., '36' for Indre)
   * @returns {Promise<BaseDoctor[]>} - Array of BaseDoctor objects
   */
  static async getDoctorsByDepartment(departementCode) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}?q=periode(etatAdministratifEtablissement:A AND activitePrincipaleEtablissement:86.21Z) AND codeCommuneEtablissement:${departementCode}* &date=2025-05-05&champs=siret,codeCommuneEtablissement,coordonneeLambertAbscisseEtablissement,coordonneeLambertOrdonneeEtablissement`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-INSEE-Api-Key-Integration": `${process.env.X_INSEE_API_KEY_INTEGRATION}`,
          },
        }
      );

      return response.data.etablissements.map((item) =>
        BaseDoctor.fromJson({
          siret: item.siret,
          codeCommune: item.adresseEtablissement.codeCommuneEtablissement,
          coordonnees: {
            x: item.adresseEtablissement.coordonneeLambertAbscisseEtablissement,
            y: item.adresseEtablissement.coordonneeLambertOrdonneeEtablissement,
          },
        })
      );
    } catch (error) {
      console.error(
        `Error fetching doctors for department ${departementCode}:`,
        error.message
      );
      throw new Error(
        `Failed to fetch doctors for department ${departementCode}`
      );
    }
  }

  /**
   * Get a doctor by its code
   * @param {string} code - Doctor code
   * @returns {Promise<DoctorDetail>} - Doctor object
   */
  static async getDoctorDetailsByCode(code) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/${code}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-INSEE-Api-Key-Integration": `${process.env.X_INSEE_API_KEY_INTEGRATION}`,
          },
        }
      );
      console.log(response.data);
      return DoctorDetails.fromJson({
        nom: response.data.etablissement.uniteLegale.nomUniteLegale,
        prenom: response.data.etablissement.uniteLegale.prenom1UniteLegale,
        denomination: response.data.etablissement.uniteLegale.denominationUniteLegale,
        creationEtablissement: response.data.etablissement.dateCreationEtablissement,
        siret: response.data.etablissement.siret,
        codeCommune: response.data.etablissement.adresseEtablissement.codeCommuneEtablissement,
        coordonnees: {
          x: response.data.etablissement.adresseEtablissement.coordonneeLambertAbscisseEtablissement,
          y: response.data.etablissement.adresseEtablissement.coordonneeLambertOrdonneeEtablissement,
        },
        adresse: response.data.etablissement.adresseEtablissement.numeroVoieEtablissement + " " + response.data.etablissement.adresseEtablissement.typeVoieEtablissement + " " + response.data.etablissement.adresseEtablissement.libelleVoieEtablissement + " " + response.data.etablissement.adresseEtablissement.libelleCommuneEtablissement
      });
    } catch (error) {
      console.error(`Error fetching doctor with code ${code}:`, error.message);
      throw new Error(`Failed to fetch doctor with code ${code}`);
    }
  }

  /**
   * Get all doctors from Indre with their codes
   * @returns {Promise<BaseDoctor[]>} - Array of BaseDoctor objects with codes
   */
  static async getDoctorsFromIndre() {
    try {
      const doctors = await this.getDoctorsByDepartment("36"); // Indre department code
      return doctors;
    } catch (error) {
      console.error("Error fetching doctors from Indre:", error.message);
      throw new Error("Failed to fetch doctors from Indre");
    }
  }
}

module.exports = DoctorService;
