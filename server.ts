import express, { Request, Response } from 'express';

import configuredRouter from './server-api/router/vacancies.router';

const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    app.use('', configuredRouter);

    app.get('*', (req: Request, res: Response) => handle(req, res));

    app.listen(3030, () => {
        console.log(`> Ready on http://localhost:${3030}`);
    });
});
