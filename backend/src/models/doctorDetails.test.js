const DoctorDetails = require('./doctorDetails');

describe('DoctorDetails', () => {
    const doctorData = {
        nom: 'Dupont',
        prenom: 'Jean',
        siret: '12345678901234',
        codeCommune: '75001',
        coordonnees: { x: '48.856614', y: '2.3522219' },
        adresse: '1 rue de Paris, 75001 Paris',
        denomination: 'Cabinet médical Dupont',
        epciCode: 'EPCI001',
        epciName: 'Métropole de Paris',
        creationEtablissement: '2010-01-15'
    };

    describe('constructor', () => {
        test('should create a new DoctorDetails instance with the provided data', () => {
            const doctor = new DoctorDetails(doctorData);

            expect(doctor.nom).toBe('Dupont');
            expect(doctor.prenom).toBe('Jean');
            expect(doctor.siret).toBe('12345678901234');
            expect(doctor.codeCommune).toBe('75001');
            expect(doctor.coordonnees).toEqual({ x: '48.856614', y: '2.3522219' });
            expect(doctor.adresse).toBe('1 rue de Paris, 75001 Paris');
            expect(doctor.denomination).toBe('Cabinet médical Dupont');
            expect(doctor.epciCode).toBe('EPCI001');
            expect(doctor.epciName).toBe('Métropole de Paris');
            expect(doctor.creationEtablissement).toBe('2010-01-15');
        });

        test('should handle missing data', () => {
            const partialData = {
                nom: 'Dupont',
                siret: '12345678901234'
            };

            const doctor = new DoctorDetails(partialData);
            expect(doctor.nom).toBe('Dupont');
            expect(doctor.siret).toBe('12345678901234');
            expect(doctor.prenom).toBeUndefined();
            expect(doctor.codeCommune).toBeUndefined();
            expect(doctor.coordonnees).toBeUndefined();
        });
    });

    describe('fromJson', () => {
        test('should create a DoctorDetails instance from JSON data', () => {
            const doctor = DoctorDetails.fromJson(doctorData);

            expect(doctor).toBeInstanceOf(DoctorDetails);
            expect(doctor.nom).toBe('Dupont');
            expect(doctor.prenom).toBe('Jean');
            expect(doctor.siret).toBe('12345678901234');
            expect(doctor.epciCode).toBe('EPCI001');
            expect(doctor.epciName).toBe('Métropole de Paris');
        });

        test('should handle empty JSON data', () => {
            const doctor = DoctorDetails.fromJson({});

            expect(doctor).toBeInstanceOf(DoctorDetails);
            expect(doctor.nom).toBeUndefined();
            expect(doctor.siret).toBeUndefined();
            expect(doctor.codeCommune).toBeUndefined();
        });
    });

    describe('toJson', () => {
        test('should convert a DoctorDetails instance to JSON representation', () => {
            const doctor = new DoctorDetails(doctorData);
            const json = doctor.toJson();

            expect(json).toEqual({
                nom: 'Dupont',
                siret: '12345678901234',
                codeCommune: '75001',
                coordonnees: { x: '48.856614', y: '2.3522219' },
                adresse: '1 rue de Paris, 75001 Paris',
                telephone: undefined
            });

            // Vérifier que les champs non inclus dans toJson() ne sont pas présents
            expect(json).not.toHaveProperty('epciCode');
            expect(json).not.toHaveProperty('epciName');
            expect(json).not.toHaveProperty('denomination');
            expect(json).not.toHaveProperty('prenom');
            expect(json).not.toHaveProperty('creationEtablissement');
        });

        test('should include telephone property even when undefined', () => {
            const doctor = new DoctorDetails(doctorData);
            const json = doctor.toJson();

            expect(json).toHaveProperty('telephone');
            expect(json.telephone).toBeUndefined();
        });
    });
});