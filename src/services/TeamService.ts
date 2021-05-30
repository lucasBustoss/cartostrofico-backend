import { getRepository } from 'typeorm';
import cartolaApi from '../config/cartolaApi';

import Team from '../models/Team';

interface Scout {
  DS: number;
  FC: number;
  PI: number;
  SG: number;
  FF: number;
  G: number;
  PP: number;
  CA: number;
  CV: number;
  FD: number;
}

interface Player {
  scout: Scout;
  apelido: string;
  foto: string;
  pontuacao: number;
  posicao_id: number;
  clube_id: number;
  entrou_em_campo: boolean;
  id: string;
}

class TeamService {
  public async find(): Promise<void> {
    console.log('findTeam');
  }

  public async findAll(): Promise<any> {
    const teamRepository = getRepository(Team);
    const teams = await teamRepository.find();

    const pointsTeams = [];

    for (let index = 0; index < teams.length; index++) {
      const team = teams[index];

      const response = await cartolaApi.get(`time/id/${team.cartolaTeamId}`);

      if (response && response.data) {
        const { pontos, rodada_atual, patrimonio, valor_time } = response.data;

        const pointTeam = {
          teamId: team.cartolaTeamId,
          teamName: team.name,
          managerName: team.managerName,
          points: pontos,
          actualRound: rodada_atual,
          patrimony: patrimonio,
          teamValue: valor_time,
        };

        pointsTeams.push(pointTeam);
      }
    }

    return pointsTeams;
  }

  public async findPoints(): Promise<any> {
    const teamRepository = getRepository(Team);
    const players = await this.findPlayersInPlay();
    // const teams = await teamRepository.find({ cartolaTeamId: 17924125 });
    const teams = await teamRepository.find();

    const pointsTeam = [];

    for (let index = 0; index < teams.length; index++) {
      const team = teams[index];
      const playersInTeam = await this.findTeamPlayers(
        Number(team.cartolaTeamId),
      );

      let points = 0;

      // Titulares
      for (let j = 0; j < playersInTeam.players.length; j++) {
        const titular = playersInTeam.players[j];

        const player = players.filter(p => Number(p.id) === titular.id);

        if (player.length > 0) {
          points += Number(player[0].pontuacao) * (titular.is_captain ? 2 : 1);
        }
      }

      const pointTeam = {
        id: team.cartolaTeamId,
        name: team.name,
        managerName: team.managerName,
        points: Number(points).toFixed(2),
      };

      pointsTeam.push(pointTeam);
    }

    pointsTeam.sort((a, b) => (b.points > a.points ? 1 : -1));
    return pointsTeam;
  }

  public async findPlayersInPlay(): Promise<Player[]> {
    const response = await cartolaApi.get(`atletas/pontuados`);

    const { atletas } = response.data;

    const playersInPlay = [];

    // Converter as propriedades do objeto em array.
    // Os jogadores ao invés de array vem em propriedades.
    const playersObject = Object.entries(atletas).map(([k, v]) => ({ [k]: v }));

    for (let index = 0; index < playersObject.length; index++) {
      const playerObject = playersObject[index];
      const player = playerObject[Object.keys(playerObject)[0]] as Player;

      /* eslint-disable */
      player.id = Object.keys(playerObject)[0];
      /* eslint-enable */

      if (player.entrou_em_campo) {
        playersInPlay.push(player);
      }
    }

    return playersInPlay;
  }

  public async findTeamPlayers(id: number): Promise<any> {
    const response = await cartolaApi.get(`time/id/${id}`);

    const { atletas, reservas, capitao_id } = response.data;

    const players = [];

    for (let index = 0; index < atletas.length; index++) {
      const atleta = atletas[index];

      const player = {
        id: atleta.atleta_id,
        is_captain: atleta.atleta_id === capitao_id,
      };

      players.push(player);
    }

    const benchIds = reservas.map(r => r.atleta_id);

    return { players, bench: benchIds };
  }

  public async save(id: string): Promise<string> {
    try {
      const teamRepository = getRepository(Team);
      const response = await cartolaApi.get(`time/id/${id}`);

      if (response && response.data) {
        const { time } = response.data;
        const { nome_cartola, nome, time_id, url_escudo_svg, url_escudo_png } =
          time;

        const existsTeam = await teamRepository.findOne({
          cartolaTeamId: time_id,
        });

        if (!existsTeam) {
          const team = teamRepository.create({
            name: nome,
            cartolaTeamId: time_id,
            managerName: nome_cartola,
            logoUrlSvg: url_escudo_svg,
            logoUrlPng: url_escudo_png,
          });

          await teamRepository.save(team);

          return 'Dados inseridos com sucesso';
        }
        return 'O time já está salvo';
      }
    } catch {
      return `O time com id ${id} não existe`;
    }

    return '';
  }
}

export default TeamService;
