import cartolaApi from '../config/cartolaApi';

class StatusService {
  public async find(): Promise<any> {
    try {
      const response = await cartolaApi.get(`mercado/status`);

      if (response && response.data) {
        const { rodada_atual, status_mercado } = response.data;

        /* eslint-disable */

        const statusMarket =
          status_mercado === 1
            ? 'Aberto'
            : status_mercado === 2
              ? 'Fechado'
              : 'Indefinido';

        /* eslint-enable */

        return { actualRound: rodada_atual, statusMarket };
      }

      return '';
    } catch {
      return `Erro`;
    }
  }
}

export default StatusService;
