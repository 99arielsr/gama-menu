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
    numero: number;
    complemento: string;
    referencia: string;
    bairro: string;
    cidade: string;
    estado: string;
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
      logradouro: string;
      numero: number;
      complemento: string;
      referencia: string;
      bairro: string;
      cidade: string;
      estado: string;
    }
  ) {
    await this.enderecoModel.findById({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.enderecoModel.deleteOne({ _id: id });
  }
}
