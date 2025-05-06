import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MunicipalityDetailComponent from '../components/municipality/MunicipalityDetailComponent';
import type { Municipality } from '../interfaces/Municipality';

const MunicipalityDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [municipality, setMunicipality] = useState<Municipality | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMunicipality = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/api/municipalities/${id}`);
                if (!response.ok) {
                    throw new Error('Impossible de récupérer les détails de la commune');
                }
                const data: Municipality = await response.json();
                setMunicipality(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMunicipality();
    }, [id]);

    if (isLoading) {
        return <div>Chargement des détails de la commune...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!municipality) {
        return <div>Commune non trouvée.</div>;
    }

    return (
        <div className="municipality-detail-page">
            <MunicipalityDetailComponent municipality={municipality} />
        </div>
    );
};

export default MunicipalityDetail;