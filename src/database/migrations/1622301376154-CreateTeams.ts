/*eslint-disable*/

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTeams1622301376154 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'teams',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'cartolaTeamId',
                        type: 'integer',
                    },
                    {
                        name: 'managerName',
                        type: 'varchar',
                    },
                    {
                        name: 'logoUrlSvg',
                        type: 'varchar',
                    },
                    {
                        name: 'logoUrlPng',
                        type: 'varchar',
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
