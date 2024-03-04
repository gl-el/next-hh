import express from 'express';

import VacanciesController from '../controller/vacancies.controller';

const router = express.Router();

router.get('/vacancies', VacanciesController.getDetailedVacancies);
router.get('/schedules', VacanciesController.getSchedules);
router.get('/positions', VacanciesController.getPositions);

export default router;
