/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertTeamsInSchedule1622313019887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO schedule ("cartolaTeamId", season, points, games, wins, draws, loses, "favorPoints", "againstPoints", "pointsBalance", percentage) 
        SELECT teams."cartolaTeamId", 2021, 0, 0, 0, 0, 0, 0, 0, 0, 0 FROM teams`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM schedule`);
    }

}
