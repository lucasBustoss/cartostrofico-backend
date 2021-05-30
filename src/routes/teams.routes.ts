import { Router } from 'express';
import TeamService from '../services/TeamService';

const betsRouter = Router();

betsRouter.get('/', async (request, response) => {
  const teamService = new TeamService();

  await teamService.find();

  return response.json({ message: 'FindTeams' });
});

betsRouter.get('/all', async (request, response) => {
  const teamService = new TeamService();
  const data = await teamService.findAll();

  return response.json(data);
});

betsRouter.get('/points', async (request, response) => {
  const teamService = new TeamService();
  const data = await teamService.findPoints();

  return response.json(data);
});

betsRouter.post('/', async (request, response) => {
  const teamService = new TeamService();

  const { team_id } = request.body;
  const data = await teamService.save(team_id.toString());

  return response.json({ message: data });
});

export default betsRouter;
