import { getRepository } from 'typeorm';

import Fixture from '../models/Fixture';

import cartolaApi from '../config/cartolaApi';

import StatusService from './StatusService';

class ScheduleService {
  public async find(round: number): Promise<any> {
    const fixtureRepository = getRepository(Fixture);

    const fixtures = await fixtureRepository
      .createQueryBuilder()
      .select(`"Fixture".id`)
      .addSelect(`round`)
      .addSelect(`hometeam.name`, 'homeTeamName')
      .addSelect(`awayteam.name`, 'awayTeamName')
      .addSelect(`"homeTeamPoints"`)
      .addSelect(`"awayTeamPoints"`)
      .addSelect(`hometeam."logoUrlSvg"`, 'homeLogo')
      .addSelect(`awayTeam."logoUrlSvg"`, 'awayLogo')
      .innerJoin(
        `teams`,
        `hometeam`,
        `hometeam."cartolaTeamId" = "Fixture"."homeTeam_id"`,
      )
      .innerJoin(
        `teams`,
        `awayteam`,
        `awayteam."cartolaTeamId" = "Fixture"."awayTeam_id"`,
      )
      .where(`round = ${round}`)
      .getRawMany();

    return fixtures;
  }

  public async updateFixturePoints(): Promise<Fixture[]> {
    const fixtureRepository = getRepository(Fixture);

    const statusService = new StatusService();

    const status = await statusService.find();

    if (status.statusMarket === 'Aberto') {
      const roundFixtures = status.actualRound - 1;

      const fixtures = await fixtureRepository.find({
        round: roundFixtures,
        finished: false,
      });

      if (fixtures.length > 0) {
        for (let index = 0; index < fixtures.length; index++) {
          const fixture = fixtures[index];
          let homeTeamPoints;
          let awayTeamPoints;

          const { homeTeam_id, awayTeam_id } = fixture;

          const homeTeamResponse = await cartolaApi.get(
            `time/id/${homeTeam_id}`,
          );

          if (homeTeamResponse && homeTeamResponse.data) {
            homeTeamPoints = homeTeamResponse.data.pontos.toFixed(2);
          }

          const awayTeamReponse = await cartolaApi.get(
            `time/id/${awayTeam_id}`,
          );

          if (awayTeamReponse && awayTeamReponse.data) {
            awayTeamPoints = awayTeamReponse.data.pontos.toFixed(2);
          }

          fixture.homeTeamPoints = homeTeamPoints;
          fixture.awayTeamPoints = awayTeamPoints;
          fixture.finished = true;
        }

        await fixtureRepository.save(fixtures);
      }

      return fixtures;
    }

    return null;
  }
}

export default ScheduleService;
