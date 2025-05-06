const Municipality = require('./municipality');

describe('Municipality', () => {
    const municipalityData = {
        nom: 'Test Commune',
        code: '36001',
        codeDepartement: '36',
        siren: '123456789',
        codeEpci: 'E123',
        codeRegion: 'R01',
        codesPostaux: ['36000'],
        population: 5000
    };

    test('should create a Municipality instance with correct properties', () => {
        const municipality = new Municipality(municipalityData);

        expect(municipality.nom).toBe('Test Commune');
        expect(municipality.code).toBe('36001');
        expect(municipality.codeDepartement).toBe('36');
        expect(municipality.siren).toBe('123456789');
        expect(municipality.codeEpci).toBe('E123');
        expect(municipality.codeRegion).toBe('R01');
        expect(municipality.codesPostaux).toEqual(['36000']);
        expect(municipality.population).toBe(5000);
    });

    test('should create a Municipality instance from JSON using fromJson', () => {
        const municipality = Municipality.fromJson(municipalityData);

        expect(municipality).toBeInstanceOf(Municipality);
        expect(municipality.nom).toBe('Test Commune');
        expect(municipality.code).toBe('36001');
    });

    test('should convert Municipality instance to JSON using toJson', () => {
        const municipality = new Municipality(municipalityData);
        const json = municipality.toJson();

        expect(json).toEqual(municipalityData);
    });
});