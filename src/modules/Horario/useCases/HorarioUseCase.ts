import { IHorario } from "../../../models/Horario";
import IRepository from "../../../repositories/IRepository";

type PayloadCadastroHorario = IHorario;

export default class HorarioUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  criar(payload: PayloadCadastroHorario){
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
    return this.repository.create(horarioData);
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroHorario) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.delete(id);
  }
}