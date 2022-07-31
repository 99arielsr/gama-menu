import { ObjectId } from "mongoose";
import BadRequest from "../../../infra/erros/BadRequest";
import { IHorario } from "../../../models/Horario";
import IRepository from "../../../repositories/IRepository";
import Estabelecimento from "../../../models/Estabelecimento";

type PayloadCadastroHorario = IHorario;

export default class HorarioUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  async criar(horarioId: string, payload: PayloadCadastroHorario) {
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

    const estabelecimentoExistente = await Estabelecimento.findById({
      _id: horarioId,
    });
    if (!estabelecimentoExistente) {
      throw new BadRequest("Estabelecimento não encontrado", 400);
    }

    const estabelecimento = await this.repository.create(horarioData);
        let horarioExistente: IHorario[] | ObjectId[] = []
        
        if  (estabelecimento){
          horarioExistente = estabelecimento.horario;
        }

        await  Estabelecimento.findByIdAndUpdate( horarioId, {
          horario: [
            ...horarioExistente,
            horarioId
          ]
        })

    return estabelecimento
  }

  async listar() {
    const lista = await this.repository.find();
    return lista
  }

  async listarId(id: any) {
    const listado = await this.repository.findOne(id);

    if (!id) {
      throw new BadRequest("Envie um Id válido!", 404);
    }
    return listado
  }

  async atualizar(id: any, payload: PayloadCadastroHorario) {
    const atualizado = await this.repository.update(id, payload);

    if (!id) {
      throw new BadRequest("Envie um id válido!", 404);
    }
    return atualizado
  }

  async deletar(id: any) {
    const deletado = await this.repository.deleteOne(id);

    if (!id) {
      throw new BadRequest("Envie um id válido!", 404);
    }
    return deletado
  }
}