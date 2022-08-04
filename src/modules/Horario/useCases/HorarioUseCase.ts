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
      hora_abre: payload.horario_abertura,
      hora_fecha: payload.horario_fechamento,
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

    return estabelecimento;
  }

  async listar() {
    return this.repository.find();
  }

  async listarId(id: any) {
    if (!id) {
      throw new BadRequest("Envie um Id válido!", 404);
    }
    return this.repository.findOne({_id: id});
  }

  async atualizar(id: any, payload: PayloadCadastroHorario) {
    if (!id) {
      throw new BadRequest("Envie um id válido!", 404);
    }
    return this.repository.update(id, payload);
  }

  async deletar(id: any) {
    if (!id) {
      throw new BadRequest("Envie um id válido!", 404);
    }
    return this.repository.deleteOne(id);
  }
}