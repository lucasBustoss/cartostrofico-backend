import { getRepository } from 'typeorm';

import Schedule from '../models/Schedule';

import cartolaApi from '../config/cartolaApi';

import StatusService from './StatusService';
import FixtureService from './FixtureService';

class ScheduleService {
  public async find(): Promise<any> {
    try {
      const scheduleRepository = getRepository(Schedule);

      const teams = await scheduleRepository
        .createQueryBuilder()
        .select(`"Schedule"."cartolaTeamId"`)
        .addSelect(`"teams"."logoUrlSvg"`)
        .addSelect(`name`)
        .addSelect(`"managerName"`)
        .addSelect(`season`)
        .addSelect(`points`)
        .addSelect(`games`)
        .addSelect(`wins`)
        .addSelect(`draws`)
        .addSelect(`loses`)
        .addSelect(`"favorPoints"`)
        .addSelect(`"againstPoints"`)
        .addSelect(`"pointsBalance"`)
        .addSelect(`percentage`)
        .innerJoin(
          `teams`,
          `teams`,
          `teams."cartolaTeamId" = "Schedule"."cartolaTeamId"`,
        )
        .orderBy(`points`, 'DESC')
        .addOrderBy(`wins`, 'DESC')
        .addOrderBy(`"favorPoints"`, 'DESC')
        .addOrderBy(`"againstPoints"`, 'DESC')
        .addOrderBy(`"pointsBalance"`, 'DESC')
        .addOrderBy(`name`)
        .getRawMany();

      return teams;
    } catch (err) {
      console.log(err);
      return `Erro`;
    }
  }

  public async update(): Promise<any> {
    const scheduleRepository = getRepository(Schedule);

    const fixtureService = new FixtureService();

    // const status = await statusService.find();

    const fixtures = await fixtureService.updateFixturePoints();
    const schedule = await scheduleRepository.find();

    for (let index = 0; index < fixtures.length; index++) {
      const fixture = fixtures[index];

      const { homeTeam_id, awayTeam_id, homeTeamPoints, awayTeamPoints } =
        fixture;

      // #region UpdateHomeTeam

      /* eslint-disable */
      const homeNewPoints =
        homeTeamPoints > awayTeamPoints
          ? 3
          : homeTeamPoints === awayTeamPoints
            ? 1
            : 0;
      /* eslint-enable */
      const homeNewWins = homeTeamPoints > awayTeamPoints ? 1 : 0;
      const homeNewDraws = homeTeamPoints === awayTeamPoints ? 1 : 0;
      const homeNewLoses = homeTeamPoints < awayTeamPoints ? 1 : 0;
      const homeNewFavorPoints = Number(homeTeamPoints);
      const homeNewAgainstPoints = Number(awayTeamPoints);
      const homeNewPointsBalance = Number(
        Number(homeTeamPoints - awayTeamPoints).toFixed(2),
      );

      const homeTeams = schedule.filter(s => s.cartolaTeamId === homeTeam_id);

      if (homeTeams.length > 0) {
        const homeTeam = homeTeams[0];
        homeTeam.points = Number(homeTeam.points) + Number(homeNewPoints);
        homeTeam.games = Number(homeTeam.games) + 1;
        homeTeam.wins = Number(homeTeam.wins) + Number(homeNewWins);
        homeTeam.draws = Number(homeTeam.draws) + Number(homeNewDraws);
        homeTeam.loses = Number(homeTeam.loses) + Number(homeNewLoses);
        homeTeam.favorPoints =
          Number(homeTeam.favorPoints) + Number(homeNewFavorPoints);
        homeTeam.againstPoints =
          Number(homeTeam.againstPoints) + Number(homeNewAgainstPoints);
        homeTeam.pointsBalance =
          Number(homeTeam.pointsBalance) + Number(homeNewPointsBalance);
        homeTeam.percentage = Number(
          Number(homeTeam.points / (homeTeam.games * 3)).toFixed(2),
        );

        await scheduleRepository.save(homeTeams);
      }

      // #endregion

      // #region UpdateAwayTeam

      /* eslint-disable */
      const awayNewPoints =
        awayTeamPoints > homeTeamPoints
          ? 3
          : homeTeamPoints === awayTeamPoints
            ? 1
            : 0;
      /* eslint-enable */
      const awayNewWins = awayTeamPoints > homeTeamPoints ? 1 : 0;
      const awayNewDraws = homeTeamPoints === awayTeamPoints ? 1 : 0;
      const awayNewLoses = awayTeamPoints < homeTeamPoints ? 1 : 0;
      const awayNewFavorPoints = awayTeamPoints;
      const awayNewAgainstPoints = homeTeamPoints;
      const awayNewPointsBalance = Number(
        Number(awayTeamPoints - homeTeamPoints).toFixed(2),
      );

      const awayTeams = schedule.filter(s => s.cartolaTeamId === awayTeam_id);

      if (awayTeams.length > 0) {
        const awayTeam = awayTeams[0];
        awayTeam.points = Number(awayTeam.points) + Number(awayNewPoints);
        awayTeam.games = Number(awayTeam.games) + 1;
        awayTeam.wins = Number(awayTeam.wins) + Number(awayNewWins);
        awayTeam.draws = Number(awayTeam.draws) + Number(awayNewDraws);
        awayTeam.loses = Number(awayTeam.loses) + Number(awayNewLoses);
        awayTeam.favorPoints =
          Number(awayTeam.favorPoints) + Number(awayNewFavorPoints);
        awayTeam.againstPoints =
          Number(awayTeam.againstPoints) + Number(awayNewAgainstPoints);
        awayTeam.pointsBalance =
          Number(awayTeam.pointsBalance) + Number(awayNewPointsBalance);
        awayTeam.percentage = Number(
          Number(awayTeam.points / (awayTeam.games * 3)).toFixed(2),
        );

        await scheduleRepository.save(awayTeams);
      }

      // #endregion
    }

    return 'Tabela atualizada com sucesso.';
  }
}

export default ScheduleService;
