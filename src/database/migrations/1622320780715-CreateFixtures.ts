/*eslint-disable*/

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFixtures1622320780715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'fixtures',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'round',
                        type: 'integer',
                    },
                    {
                        name: 'homeTeam_id',
                        type: 'integer',
                    },
                    {
                        name: 'awayTeam_id',
                        type: 'integer',
                    },
                    {
                        name: 'homeTeamPoints',
                        type: 'decimal',
                    },
                    {
                        name: 'awayTeamPoints',
                        type: 'decimal',
                    },
                    {
                        name: 'finished',
                        type: 'boolean',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('fixtures');
    }

}
