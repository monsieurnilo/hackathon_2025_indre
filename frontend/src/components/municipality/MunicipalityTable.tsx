import React from 'react';
import type { MunicipalityTableProps } from '../../interfaces/MunicipalityTableProps';

const MunicipalityTable: React.FC<MunicipalityTableProps> = ({
    municipalities,
    isLoading = false,
    error
}) => {
    if (isLoading) {
        return <h2>Loading municipalities...</h2>;
    }

    if (error) {
        return <h2 color="error">Error: {error}</h2>;
    }

    if (!municipalities || municipalities.length === 0) {
        return <h2>No municipalities found.</h2>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Department</th>
                        <th>Postal Codes</th>
                        <th>Population</th>
                        <th>SIREN</th>
                        <th>EPCI Code</th>
                        <th>Region Code</th>
                    </tr>
                </thead>
                <tbody>
                    {municipalities.map((municipality) => (
                        <tr key={municipality.code}>
                            <td>{municipality.nom}</td>
                            <td>{municipality.code}</td>
                            <td>{municipality.codeDepartement}</td>
                            <td>{municipality.codesPostaux.join(', ')}</td>
                            <td>{municipality.population.toLocaleString()}</td>
                            <td>{municipality.siren}</td>
                            <td>{municipality.codeEpci}</td>
                            <td>{municipality.codeRegion}</td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    );
};

export default MunicipalityTable;