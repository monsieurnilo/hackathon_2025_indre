import React, { useState, useEffect } from 'react';
import MunicipalityService from '../services/MunicipalityService';
import MunicipalityTable from '../components/municipality/MunicipalityTable';
import type { Municipality } from '../interfaces/Municipality';

const MunicipalityPage: React.FC = () => {
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMunicipalities = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await MunicipalityService.getMunicipalitiesFromIndre();
                setMunicipalities(data);
            } catch (err) {
                setError('Failed to fetch municipalities');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMunicipalities();
    }, []);

    return (
        <div className="municipality-page">
            <MunicipalityTable
                municipalities={municipalities}
                isLoading={isLoading}
                error={error || undefined}
            />
        </div>
    );
};

export default MunicipalityPage;