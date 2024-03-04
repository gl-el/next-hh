import {
    EmploymentsApiProps,
    ErrorsApiProps,
    ProfessionsApiProps,
    VacanciesRequestProps,
} from '@api/common/types';

import { VacancyProps } from '@customTypes/index';

import { LOCAL_API_BASE, PAGE_SIZE } from '@scripts/consts';
import { VacanciesQueryResponse } from '@api/vacancies/types';

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
    const response = await fetch(`${LOCAL_API_BASE}/vacancies/${vacancyId}`);
    return returnJSON<VacancyProps>(response);
}

export async function getVacancies({page = 1, employmentID, positionID}: VacanciesRequestProps) {
    const response = await fetch(
        `${LOCAL_API_BASE}/vacancies?page=${page}${employmentID ? `&employment=${employmentID}` : ''}${positionID ? `&position=${positionID}` : ''}`
    );
    return returnJSON<VacanciesQueryResponse>(response);
}

export async function getPositions() {
    const response = await fetch(`${LOCAL_API_BASE}/positions`);
    return returnJSON<ProfessionsApiProps>(response);
}

export async function getEmployments() {
    const response = await fetch(`${LOCAL_API_BASE}/employments`);
    return returnJSON<EmploymentsApiProps[]>(response);
}
