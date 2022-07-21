import IRepository from "../IRepository";
import IEndereco from "./IEndereco";
import { Model } from "mongoose";

export default class EnderecoRepository implements IRepository {
  private enderecoModel: any;
  constructor(enderecoModel: Model<IEndereco>) {
    this.enderecoModel = enderecoModel;
  }
  async create(
    payload: { 
      logradouro: string; 
      numero: number; 
      complemento: string;
      referencia: string; 
      bairro: string; 
      cidade: string; 
      estado: string;
    }
  ){
    return this.enderecoModel.create(payload);
  }
  
  async find(payload?: any) {}
  async update(payload: any) {}
  async findAll(payload?: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}