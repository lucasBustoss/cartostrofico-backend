import { Router } from 'express';
import teamsRouter from './teams.routes';
import statusRouter from './status.routes';
import scheduleRouter from './schedule.routes';

const routes = Router();

routes.use('/teams', teamsRouter);
routes.use('/status', statusRouter);
routes.use('/schedule', scheduleRouter);

export default routes;
