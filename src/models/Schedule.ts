/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedule')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cartolaTeamId: number;

  @Column()
  season: number;

  @Column()
  points: number;

  @Column()
  games: number;

  @Column()
  wins: number;

  @Column()
  draws: number;

  @Column()
  loses: number;

  @Column('float8')
  favorPoints: number;

  @Column('float8')
  againstPoints: number;

  @Column('float8')
  pointsBalance: number;

  @Column('float8')
  percentage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
