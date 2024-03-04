import express from 'express';

import VacanciesController from '../controller/vacancies.controller';

const router = express.Router();

router.get('/vacancies', VacanciesController.getDetailedVacancies);
router.get('/employments', VacanciesController.getEmployments);
router.get('/positions', VacanciesController.getPositions);

export default router;
