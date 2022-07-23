import { Model, Schema } from "mongoose";
import { IEndereco } from "../../models/Endereco";
import { IEstabelecimento } from "../../models/Estabelecimento";
import { IHorario } from "../../models/Horario";
import { IImages } from "../../models/Images";
import IRepository from "../IRepository";

export default class EstabelecimentoRepository implements IRepository {
  private estabelecimentoModel: any;
  constructor(estabelecimentoModel: Model<IEstabelecimento>) {
    this.estabelecimentoModel = estabelecimentoModel;
  }
  async create(
    payload: { 
      nome: string;
      segmento: string;
      logo: Schema.Types.ObjectId[] | IImages[]; 
      endereco: Schema.Types.ObjectId[] | IEndereco[]; 
      ativo: boolean; 
      horario: Schema.Types.ObjectId[] | IHorario []; 
      delivery: boolean; 
      retirada: boolean;
    }
  ){
    return this.estabelecimentoModel.create(payload);
  }
  
  async find() {
    return this.estabelecimentoModel.find();
  }
  
  async update(payload: any) {}
  async findById(id: any) {}
  async delete(id: any) {}
}