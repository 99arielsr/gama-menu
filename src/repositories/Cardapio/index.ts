import { Model, Schema } from "mongoose";
import { ICardapio } from "../../models/Cardapio";
import { ICategoria } from "../../models/Categoria";
import IRepository from "../IRepository";

export default class CardapioRepository implements IRepository {
  private cardapioModel: any;
  constructor(estabelecimentoModel: Model<ICardapio>) {
    this.cardapioModel = estabelecimentoModel;
  }
  async create(
    payload: {
      nome: string; 
      categoria: Schema.Types.ObjectId[] | ICategoria[]; 
    }
  ){
    return this.cardapioModel.create(payload);
  }
  
  async find() {
    return this.cardapioModel.find();
  }

  async findOne(id: any) {
    return this.cardapioModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      categoria: Schema.Types.ObjectId[] | ICategoria[];
    }
  ) {
    await this.cardapioModel.findByIdAndUpdate({_id: id}, payload);
  }

  async deleteOne(id: any) {
    return await this.cardapioModel.findByIdAndDelete({_id: id});
  }
}