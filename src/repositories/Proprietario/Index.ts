import IRepository from "../IRepository";
import IProprietario from "./IProprietario";
import IEstabelecimento from "../Estabelecimento/IEstabelecimento";
import { Model } from "mongoose";

export default class ProprietarioRepository implements IRepository {
  private proprietarioModel: any;
  constructor(proprietarioModel: Model<IProprietario>) {
    this.proprietarioModel = proprietarioModel;
  }
  async create(
    payload: { 
      nome: string;
      email: string;
      senha: string;
      hashResetSenha: string;
      estabelecimento: IEstabelecimento [];
    }
  ){
    return this.proprietarioModel.create(payload);
  }
  
  async find(payload?: any) {}
  async update(payload: any) {}
  async findAll(payload?: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}