import { Router } from 'express';
import StatusService from '../services/StatusService';

const betsRouter = Router();

betsRouter.get('/', async (request, response) => {
  const statusService = new StatusService();

  const data = await statusService.find();

  return response.json(data);
});

export default betsRouter;
