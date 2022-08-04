import IRepository from "../IRepository";
import { Model } from "mongoose";
import { IHorario } from "../../models/Horario";

export default class HorarioRepository implements IRepository {
  private horarioModel: any;
  constructor(horarioModel: Model<IHorario>) {
    this.horarioModel = horarioModel;
  }
  async create(payload: {
    horario_abertura: Date;
    horario_fechamento: Date;
    domingo: boolean;
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
  }) {
    return this.horarioModel.create(payload);
  }

  async find() {
    return this.horarioModel.find();
  }

  async findOne(id: any) {
    return this.horarioModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      horario_abertura: Date;
      horario_fechamento: Date;
      domingo: boolean;
      segunda: boolean;
      terca: boolean;
      quarta: boolean;
      quinta: boolean;
      sexta: boolean;
      sabado: boolean;
    }
  ) {
    return await this.horarioModel.findByIdAndUpdate({_id: id}, payload);
  }

  async deleteOne(id: any) {
    return await this.horarioModel.findByIdAndDelete({_id: id});
  }

  async count(payload:any) {}
}
