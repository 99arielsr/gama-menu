import IRepository from "../../../repositories/IRepository";
import IHorario from "../../../repositories/Horario/IHorario";

type PayloadCadastroHorario = IHorario;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  cadastroHorario(payload: PayloadCadastroHorario){
    const horarioData = {
      hora_abre: payload.hora_abre,
      hora_fecha: payload.hora_fecha,
      domingo: payload.domingo,
      segunda: payload.segunda,
      terca: payload.terca,
      quarta: payload.quarta,
      quinta: payload.quinta,
      sexta: payload.sexta,
      sabado: payload.sabado,
    }
    const novoHorario = this.repository.create(horarioData);
    return novoHorario;
  }
}