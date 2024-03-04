import { VacancyProps } from '@customTypes/index';

export interface VacanciesQueryResponse {
    vacancies: VacancyProps[];
    pagesTotal: number;
}
