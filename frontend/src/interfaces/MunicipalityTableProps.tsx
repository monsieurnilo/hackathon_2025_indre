import type { Municipality } from './Municipality';

export interface MunicipalityTableProps {
    municipalities: Municipality[];
    isLoading?: boolean;
    error?: string;
}
