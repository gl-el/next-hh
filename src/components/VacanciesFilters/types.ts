import { Options } from 'react-select';

export interface VacanciesFiltersProps {
    employments: {
        value: string;
        label: string;
    }[];
    positions: {
        value: string;
        label: string;
    }[];
}
