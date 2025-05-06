const BaseDoctor = require('./baseDoctor');

describe('BaseDoctor', () => {
    const doctorData = {
        nom: 'Dr. Smith',
        siret: '12345678901234',
        codeCommune: '75001',
        coordonnees: { x: '48.856614', y: '2.3522219' }
    };

    describe('constructor', () => {
        test('should create a new BaseDoctor instance with the provided data', () => {
            const doctor = new BaseDoctor(doctorData);

            expect(doctor.nom).toBe('Dr. Smith');
            expect(doctor.siret).toBe('12345678901234');
            expect(doctor.codeCommune).toBe('75001');
            expect(doctor.coordonnees).toEqual({ x: '48.856614', y: '2.3522219' });
        });

        test('should handle missing data', () => {
            const partialData = {
                nom: 'Dr. Smith',
                siret: '12345678901234'
            };

            const doctor = new BaseDoctor(partialData);
            expect(doctor.nom).toBe('Dr. Smith');
            expect(doctor.siret).toBe('12345678901234');
            expect(doctor.codeCommune).toBeUndefined();
            expect(doctor.coordonnees).toBeUndefined();
        });
    });

    describe('fromJson', () => {
        test('should create a BaseDoctor instance from JSON data', () => {
            const doctor = BaseDoctor.fromJson(doctorData);

            expect(doctor).toBeInstanceOf(BaseDoctor);
            expect(doctor.nom).toBe('Dr. Smith');
            expect(doctor.siret).toBe('12345678901234');
            expect(doctor.codeCommune).toBe('75001');
            expect(doctor.coordonnees).toEqual({ x: '48.856614', y: '2.3522219' });
        });

        test('should handle empty JSON data', () => {
            const doctor = BaseDoctor.fromJson({});
            expect(doctor).toBeInstanceOf(BaseDoctor);
            expect(doctor.nom).toBeUndefined();
            expect(doctor.siret).toBeUndefined();
            expect(doctor.codeCommune).toBeUndefined();
            expect(doctor.coordonnees).toBeUndefined();
        });
    });

    describe('toJson', () => {
        test('should convert a BaseDoctor instance to JSON representation', () => {
            const doctor = new BaseDoctor(doctorData);
            const json = doctor.toJson();

            expect(json).toEqual({
                siret: '12345678901234',
                codeCommune: '75001',
                coordonnees: { x: '48.856614', y: '2.3522219' }
            });

            // Le champ 'nom' n'est pas inclus dans la représentation JSON
            expect(json).not.toHaveProperty('nom');
        });
    });
});