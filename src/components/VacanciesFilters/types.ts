import { Options } from 'react-select';

export interface VacanciesFiltersProps {
    schedules: {
        name: string;
        id: string;
    }[];
    positions: {
        name: string;
        id: string;
    }[];
}
