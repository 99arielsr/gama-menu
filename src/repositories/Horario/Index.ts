import IRepository from "../IRepository";
import IHorario from "./IHorario";
import { Model } from "mongoose";

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
  
  async find(payload?: any) {}
  async update(payload: any) {}
  async findAll(payload?: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}