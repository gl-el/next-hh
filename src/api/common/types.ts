export type ErrorsApiProps = {
    errors: {
        type: string;
        value?: string;
    }[];
};

export interface VacanciesRequestProps {
    page: number;
    employmentID?: string;
    positionID?: string;
}

export interface DictionariesApiProps extends Record<string, { id: string; name: string }[]> {
    employment: {
        id: string;
        name: string;
    }[];
}

export interface EmploymentsApiProps {
    id: string,
    name: string;
}

export interface ProfessionsApiProps {
    categories: {
        id: string;
        name: string;
        roles: {
            id: string;
            name: string;
            accept_incomplete_resumes: string;
            is_default: string;
        }[];
    }[];
}

export interface VacancyPreviewsApiProps {
    items: {
        id: string;
    }[];
    found: number;
    pages: number;
    page: number;
    per_page: number;
}
