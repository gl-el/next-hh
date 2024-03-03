import { VacancyProps } from '@api/common/types';

export interface VacanciesQueryResponse {
    vacancies: VacancyProps[];
    pagesTotal: number;
}
