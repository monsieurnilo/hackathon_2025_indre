import React from 'react';
import type { Municipality } from '../../interfaces/Municipality';

export interface MunicipalityDetailComponentProps {
    municipality: Municipality;
}

const MunicipalityDetailComponent: React.FC<MunicipalityDetailComponentProps> = ({ municipality }) => {
    return (
        <div>
            <h2>Détails de la commune : {municipality.nom}</h2>
            <div>
                <div>
                    <p><strong>Code:</strong> {municipality.code}</p>
                    <p><strong>Nom:</strong> {municipality.nom}</p>
                    <p><strong>Département:</strong> {municipality.codeDepartement}</p>
                    <p><strong>SIREN:</strong> {municipality.siren}</p>
                    <p><strong>Code EPCI:</strong> {municipality.codeEpci}</p>
                    <p><strong>Région:</strong> {municipality.codeRegion}</p>
                    <p><strong>Codes postaux:</strong> {municipality.codesPostaux.join(", ")}</p>
                    <p><strong>Population:</strong> {municipality.population.toLocaleString()} habitants</p>
                </div>
            </div>
        </div>
    );
};

export default MunicipalityDetailComponent;