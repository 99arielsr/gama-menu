import IRepository from "../IRepository";
import { Model } from "mongoose";
import { IEndereco } from "../../models/Endereco";

export default class EnderecoRepository implements IRepository {
  private enderecoModel: any;
  constructor(enderecoModel: Model<IEndereco>) {
    this.enderecoModel = enderecoModel;
  }
  async create(payload: {
    logradouro: string;
    numero: string;
    complemento?: string;
    referencia?: string;
    bairro: string;
    cidade?: string;
    estado?: string;
  }) {
    return this.enderecoModel.create(payload);
  }

  async find() {
    return this.enderecoModel.find();
  }

  async findOne(id: any) {
    return this.enderecoModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      logradouro?: string;
      numero?: string;
      complemento?: string;
      referencia?: string;
      bairro?: string;
      cidade?: string;
      estado?: string;
    }
  ) {
    return await this.enderecoModel.findByIdAndUpdate({_id: id}, payload);
  }

  async deleteOne(id: any) {
    return await this.enderecoModel.findByIdAndDelete({_id: id});
  }

  async count(payload:any) {}
}
