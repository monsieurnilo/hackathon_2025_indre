import React, { useState } from 'react';
import type { MunicipalityTableProps } from '../../interfaces/MunicipalityTableProps';
import Spinner from '../loader/spinner';

const MunicipalityTable: React.FC<MunicipalityTableProps> = ({
    municipalities,
    isLoading = false,
    error
}) => {
    const [search, setSearch] = useState('');

    // Filtrage sur toutes les propriétés principales de la commune
    const filteredMunicipalities = municipalities.filter((municipality) => {
        const searchLower = search.toLowerCase();
        return (
            municipality.nom.toLowerCase().includes(searchLower) ||
            municipality.code.toLowerCase().includes(searchLower) ||
            municipality.codeDepartement.toLowerCase().includes(searchLower) ||
            municipality.siren.toLowerCase().includes(searchLower) ||
            municipality.codeEpci.toLowerCase().includes(searchLower) ||
            municipality.codeRegion.toLowerCase().includes(searchLower) ||
            municipality.codesPostaux.some(cp => cp.toLowerCase().includes(searchLower)) ||
            municipality.population.toString().includes(searchLower)
        );
    });

    if (isLoading) {
        return (
            <div className="flex center align-center " style={{ height: '90vh' }}>
                <Spinner size={50} borderWidth={5} color="#0969da" backgroundColor="#f3f3f3" />
            </div>
        )
    }

    if (error) {
        return <div className="flash fg-danger">Une erreur est survenue : {error}</div>;
    }

    if (!municipalities || municipalities.length === 0) {
        return <h2>Aucune commune a été trouvé</h2>;
    }

    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Rechercher une commune, code postal, SIREN, etc."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '1rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                }}
            >
                {filteredMunicipalities.map((municipality) => (
                    <article
                        key={municipality.code}
                        className="shadow"
                        style={{
                            minWidth: 0,
                            boxSizing: 'border-box',
                        }}
                    >
                        <header>
                            <h3 className="bold">
                                {municipality.nom}
                            </h3>
                        </header>
                        <div className='mb-1'>
                            <p><strong className="semibold">Département :</strong> {municipality.codeDepartement}</p>
                            <p><strong className="semibold">Code postal :</strong> {municipality.codesPostaux.join(', ')}</p>
                            <p><strong className="semibold">Population :</strong> {municipality.population.toLocaleString()}</p>
                            <p><strong className="semibold">SIREN :</strong> {municipality.siren}</p>
                            <p><strong className="semibold">Code EPCI :</strong> {municipality.codeEpci}</p>
                            <p><strong className="semibold">Code région :</strong> {municipality.codeRegion}</p>
                        </div>
                        <footer className="muted mt-3 text-secondary small">
                            Commune N°{municipality.code}
                        </footer>
                    </article>
                ))}
            </div>
        </>
    );
};

export default MunicipalityTable;