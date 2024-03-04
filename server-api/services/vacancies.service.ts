import {
    DictionariesApiProps,
    ErrorsApiProps,
    ProfessionsApiProps,
    VacanciesRequestProps,
    VacancyPreviewsApiProps,
} from '@api/common/types';

import { VacancyProps } from '@customTypes/index';

import { API_BASE, PAGE_SIZE } from '../../src/scripts/consts';

class VacanciesService {
    // eslint-disable-next-line class-methods-use-this

    async returnJSON<T extends object>(response: Response) {
        if (!response.ok) {
            try {
                const errors: ErrorsApiProps = await response.json();
                if ('errors' in errors) {
                    throw new Error(
                        errors.errors
                            .reduce((messages: string[], errorItem) => {
                                messages.push(errorItem.type);
                                return messages;
                            }, [])
                            .join(', ')
                    );
                }
            } catch (e) {
                if (e instanceof Error) {
                    throw new Error(`Error occurred because of: ${e.message}`);
                } else {
                    throw new Error('Unexpected error during getting data');
                }
            }
        }

        const data: T = await response.json();
        return data;
    }

    async getVacancy(vacancyId: string) {
        const response = await fetch(`${API_BASE}/vacancies/${vacancyId}`);
        return this.returnJSON<VacancyProps>(response);
    }

    // eslint-disable-next-line class-methods-use-this
    async getVacancies({ page = 1, employmentID, positionID }: VacanciesRequestProps) {
        console.error(page, employmentID, positionID);
        const response = await fetch(
            `${API_BASE}/vacancies?locale=EN&per_page=${PAGE_SIZE}&page=${page ? page : 1}${employmentID ? `&employment=${employmentID}` : ''}${positionID ? `&professional_role=${positionID}` : ''}`
        );
        return this.returnJSON<VacancyPreviewsApiProps>(response);
    }

    async getDictionaries() {
        const response = await fetch(`${API_BASE}/dictionaries?locale=EN`);
        return this.returnJSON<DictionariesApiProps>(response);
    }

    async getProfessionalRoles() {
        const response = await fetch(`${API_BASE}/professional_roles?locale=EN`);
        return this.returnJSON<ProfessionsApiProps>(response);
    }
}

export default new VacanciesService();
