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
