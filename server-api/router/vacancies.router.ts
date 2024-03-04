import express from 'express';

import VacanciesController from '../controller/vacancies.controller';

const router = express.Router();

router.get('/vacancies', VacanciesController.getDetailedVacancies);

export default router;
