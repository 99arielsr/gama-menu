import { Schema, model } from "mongoose";
import IRepository from "../IRepository";
import IEstabelecimento from "./IEstabelecimento";
import IEdereco from "../Endereco/IEndereco";
import IHorario from "../Horario/IHorario";
import IImages from "../Images/IImages";
import { Model } from "mongoose";

export default class EstabelecimentoRepository implements IRepository {
  private estabelecimentoModel: any;
  constructor(estabelecimentoModel: Model<IEstabelecimento>) {
    this.estabelecimentoModel = estabelecimentoModel;
  }
  async create(
    payload: { 
      name: string; 
      logo: IImages[]; 
      endereco: IEdereco[]; 
      ativo: boolean; 
      horario_funcionameno: IHorario []; 
      delivery: boolean; 
      retirada: boolean;
    }
  ){
    return this.estabelecimentoModel.create(payload);
  }
  
  async find(payload?: any) {}
  async update(payload: any) {}
  async findAll(payload?: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}