/*eslint-disable*/

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSchedule1622311462195 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'schedule',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'cartolaTeamId',
                        type: 'integer',
                    },
                    {
                        name: 'season',
                        type: 'integer',
                    },
                    {
                        name: 'points',
                        type: 'integer',
                    },
                    {
                        name: 'games',
                        type: 'integer',
                    },
                    {
                        name: 'wins',
                        type: 'integer',
                    },
                    {
                        name: 'draws',
                        type: 'integer',
                    },
                    {
                        name: 'loses',
                        type: 'integer',
                    },
                    {
                        name: 'favorPoints',
                        type: 'decimal',
                    },
                    {
                        name: 'againstPoints',
                        type: 'decimal',
                    },
                    {
                        name: 'pointsBalance',
                        type: 'decimal',
                    },
                    {
                        name: 'percentage',
                        type: 'decimal',
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
        await queryRunner.dropTable('teams');
    }
}
