import {
    DictionariesApiProps,
    ErrorsApiProps,
    ProfessionsApiProps,
    VacanciesRequestProps,
    VacancyPreviewsApiProps,

} from '@api/common/types';

import { API_BASE, PAGE_SIZE } from '@scripts/consts';
import { VacancyProps } from '@customTypes/index';

async function returnJSON<T extends object>(response: Response) {
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: T | ErrorsApiProps = await response.json();
    if ('errors' in data) {
        throw new Error(
            data.errors
                .reduce((messages: string[], errorItem) => {
                    messages.push(errorItem.type);
                    return messages;
                }, [])
                .join(', ')
        );
    }

    return data;
}

export async function getVacancy(vacancyId: string) {
    const response = await fetch(`${API_BASE}/vacancies/${vacancyId}`);
    return returnJSON<VacancyProps>(response);
}

export async function getVacancies({ page = 1, employmentID, positionID }: VacanciesRequestProps) {
    const response = await fetch(
        `${API_BASE}/vacancies?locale=EN&per_page=${PAGE_SIZE}&page=${page}${employmentID ? `&employment=${employmentID}` : ''}${positionID ? `&professional_role=${positionID}` : ''}`
    );
    return returnJSON<VacancyPreviewsApiProps>(response);
}

export async function getPositions() {
    const response = await fetch(`${API_BASE}/professional_roles?locale=EN`);
    return returnJSON<ProfessionsApiProps>(response);
}

export async function getDictionaries() {
    const response = await fetch(`${API_BASE}/dictionaries?locale=EN`);
    return returnJSON<DictionariesApiProps>(response);
}

export async function getVacanciesDetailed({ page = 1, employmentID, positionID }: VacanciesRequestProps) {
    const data = await getVacancies({ page, employmentID, positionID });
    const pagesTotal = data?.pages ?? 0;
    const vacanciesID = data.items.map(item => item.id);
    const vacancies = await Promise.all(vacanciesID.map(id => getVacancy(id)));
    return { vacancies, pagesTotal };
}
