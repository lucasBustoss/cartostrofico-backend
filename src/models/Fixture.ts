/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fixtures')
class Fixture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  round: number;

  @Column()
  homeTeam_id: number;

  @Column()
  awayTeam_id: number;

  @Column('float8')
  homeTeamPoints: number;

  @Column('float8')
  awayTeamPoints: number;

  @Column()
  finished: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Fixture;
