import { Request, RequestHandler, Response } from 'express';

import VacanciesService from '../services/vacancies.service';

type ReqQuery = {
    page?: string;
    employment?: string;
    position?: string;
};

class VacanciesController {
    // eslint-disable-next-line class-methods-use-this

    getDetailedVacancies: RequestHandler<unknown, unknown, unknown, ReqQuery> = async (req, res: Response) => {
        const { query } = req;
        const { page, employment: employmentID, position: positionID } = query;
        try {
            const data = await VacanciesService.getVacancies({ page: Number(page), employmentID, positionID });

            const pagesTotal = data?.pages ?? 0;

            const vacanciesID = data.items.map(item => item.id);

            const vacancies = await Promise.all(vacanciesID.map(id => VacanciesService.getVacancy(id)));

            res.status(200).json({ vacancies, pagesTotal });
        } catch (e) {
            console.warn(e, '\n\n-----------------------------------------------------');
            if (e instanceof Error) {
                res.status(500).send(e.message);
            } else {
                res.status(500).send('Unexpected error getting vacancies');
            }
        }
    };
    getEmployments = async (req: Request, res: Response) => {
        try {
            const data = await VacanciesService.getDictionaries();
            const employment = data.employment;
            res.status(200).json(employment);
        } catch (e) {
            console.warn(e, '\n\n-----------------------------------------------------');
            if (e instanceof Error) {
                res.status(500).send(e.message);
            } else {
                res.status(500).send('Unexpected error getting schedules');
            }
        }
    };

    getPositions = async (req: Request, res: Response) => {
        try {
            const data = await VacanciesService.getProfessionalRoles();
            const positions = data.categories.flatMap(category =>
                category.roles.map(role => ({ id: role.id, name: role.name }))
            );

            const uniquePositions = positions.filter(
                (value, index, self) => index === self.findIndex(t => t.id === value.id)
            );
            res.status(200).json(uniquePositions);
        } catch (e) {
            console.warn(e, '\n\n-----------------------------------------------------');
            if (e instanceof Error) {
                res.status(500).send(e.message);
            } else {
                res.status(500).send('Unexpected error getting positions');
            }
        }
    };
}

export default new VacanciesController();
