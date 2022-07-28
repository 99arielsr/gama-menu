import { Model, Schema } from "mongoose";
import { ICardapio } from "../../models/Cardapio";
import { ICategorias } from "../../models/Categoria";
import IRepository from "../IRepository";

export default class CardapioRepository implements IRepository {
  private cardapioModel: any;
  constructor(estabelecimentoModel: Model<ICardapio>) {
    this.cardapioModel = estabelecimentoModel;
  }
  async create(
    payload: { 
      categoria: Schema.Types.ObjectId[] | ICategorias[]; 
    }
  ){
    return this.cardapioModel.create(payload);
  }
  
  async find() {
    return this.cardapioModel.find();
  }
  
  async update(payload: any) {}
  async findOne(payload: any) {}
  async delete(id: any) {}
}