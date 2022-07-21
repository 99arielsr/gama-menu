import IRepository from "../IRepository";
import IPropietario from "./IPropietario";
import IEstabelecimento from "../Estabelecimento/IEstabelecimento";
import { Model } from "mongoose";

export default class PropietarioRepository implements IRepository {
  private propietarioModel: any;
  constructor(propietarioModel: Model<IPropietario>) {
    this.propietarioModel = propietarioModel;
  }
  async create(
    payload: { 
      name: string;
      email: string;
      senha: string;
      estabelecimento: IEstabelecimento [];
    }
  ){
    return this.propietarioModel.create(payload);
  }
  
  async find(payload?: any) {}
  async update(payload: any) {}
  async findAll(payload?: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}