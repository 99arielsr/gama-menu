import IRepository from "../IRepository";
import { IEstabelecimento } from "../../models/Estabelecimento";
import { IProprietario } from "../../models/Proprietario";
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
  async update(payload: any) {}

  async find() {
    return this.proprietarioModel.find().populate({
      path: "estabelecimento",
      select: "nome",
    });
  }

  async findOne(payload: any) {
      return this.proprietarioModel.findById(payload);
    }

  async delete(payload: any) {}
}
