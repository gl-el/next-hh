import { API_BASE, PAGE_SIZE } from '../../src/scripts/consts';

class VacanciesService {
    // eslint-disable-next-line class-methods-use-this
    async getVacancy(vacancyId: string) {
        const response = await fetch(`${API_BASE}/vacancies/${vacancyId}`);
        const data = await response.json();
        return data;
    }

    // eslint-disable-next-line class-methods-use-this
    async getVacancies({ page = 1, employmentID, positionID }: any) {
        const response = await fetch(
            `${API_BASE}/vacancies?locale=EN&per_page=${PAGE_SIZE}&page=${page}${employmentID ? `&employment=${employmentID}` : ''}${positionID ? `&professional_role=${positionID}` : ''}`
        );
        const data = await response.json();
        return data;
    }
}

export default new VacanciesService();
