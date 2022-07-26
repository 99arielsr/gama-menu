import IRepository from "../IRepository";
import { Model } from "mongoose";
import { IHorario } from "../../models/Horario";

export default class HorarioRepository implements IRepository {
  private horarioModel: any;
  constructor(horarioModel: Model<IHorario>) {
    this.horarioModel = horarioModel;
  }
  async create(
    payload: { 
      hora_abre: Date; 
      hora_fecha: Date; 
      domingo: boolean; 
      segunda: boolean; 
      terca: boolean; 
      quarta: boolean; 
      quinta: boolean; 
      sexta: boolean; 
      sabado: boolean;
    }
    ){
    return this.horarioModel.create(payload);
  }
  
  async find() {
    return this.horarioModel.find();
  }
  async update(payload: any) {}
  async findOne(payload: any) {}
  async delete(payload: any) {}
}