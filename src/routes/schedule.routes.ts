import { Router } from 'express';
import ScheduleService from '../services/ScheduleService';

const betsRouter = Router();

betsRouter.get('/', async (request, response) => {
  const scheduleService = new ScheduleService();

  const data = await scheduleService.find();

  return response.json(data);
});

export default betsRouter;
