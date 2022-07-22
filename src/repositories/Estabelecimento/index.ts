import IRepository from "../IRepository";
import IEstabelecimento from "./IEstabelecimento";
import IEdereco from "../Endereco/IEndereco";
import IHorario from "../Horario/IHorario";
import IImages from "../Images/IImages";
import { Model, Schema } from "mongoose";

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
      endereco: Schema.Types.ObjectId[] | IEdereco[]; 
      ativo: boolean; 
      horario: Schema.Types.ObjectId[] | IHorario []; 
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