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
    schedule: {
        id: string;
        name: string;
    }[];
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

interface Area {
    id: string;
    name: string;
    url: string;
}

interface Employer {
    alternate_url: string | null;
    logo_urls: {
        '90': string | null;
        '240': string | null;
        original: string;
    } | null;
    name: string;
    url: string;
}

export interface VacancyProps {
    alternate_url: string;
    area: Area;
    apply_alternate_url: string;
    description: string;
    employer: Employer | null;
    employment: {
        id: string;
        name: string;
    } | null;
    id: string;
    key_skills: {
        name: string;
    }[];
    name: string;
    schedule: {
        id: string;
        name: string;
    }[];
}
