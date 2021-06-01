import { Router } from 'express';
import teamsRouter from './teams.routes';
import statusRouter from './status.routes';
import scheduleRouter from './schedule.routes';
import fixturesRouter from './fixtures.routes';

const routes = Router();

routes.use('/teams', teamsRouter);
routes.use('/status', statusRouter);
routes.use('/schedule', scheduleRouter);
routes.use('/fixtures', fixturesRouter);

export default routes;
