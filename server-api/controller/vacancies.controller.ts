import { Request, Response } from 'express';

import VacanciesService from '../services/vacancies.service';

class VacanciesController {
    // eslint-disable-next-line class-methods-use-this
    async getDetailedVacancies(req: Request, res: Response) {
        const { query } = req;
        const { page, employmentID, positionID } = query;

        const data = await VacanciesService.getVacancies({ page, employmentID, positionID });

        let vacancies;
        let pagesTotal;

        try {
            // @ts-ignore
            pagesTotal = data?.pages ?? 0;
            // @ts-ignore
            const vacanciesID = data.items?.map(item => item.id);

            vacancies = await Promise.allSettled(
                vacanciesID.map(
                    // @ts-ignore
                    id => VacanciesService.getVacancies(id)
                )
            );
        } catch (e) {
            console.warn(e, '\n\n\n\n\n\n\n')
            res.status(500).send('An error getted');
        }

        res.json({ vacancies, pagesTotal });
    }
}

export default new VacanciesController();
