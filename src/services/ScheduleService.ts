import { getRepository } from 'typeorm';

import Schedule from '../models/Schedule';

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
        .orderBy(`points`)
        .addOrderBy(`wins`)
        .addOrderBy(`"favorPoints"`)
        .addOrderBy(`"againstPoints"`)
        .addOrderBy(`"pointsBalance"`)
        .addOrderBy(`name`)
        .getRawMany();

      return teams;
    } catch (err) {
      console.log(err);
      return `Erro`;
    }
  }
}

export default ScheduleService;
