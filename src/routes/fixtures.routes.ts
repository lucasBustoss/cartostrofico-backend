import { Router } from 'express';
import FixtureService from '../services/FixtureService';

const betsRouter = Router();

betsRouter.get('/', async (request, response) => {
  const fixtureService = new FixtureService();

  const { round } = request.query;

  const data = await fixtureService.find(Number(round));

  return response.json(data);
});

export default betsRouter;
