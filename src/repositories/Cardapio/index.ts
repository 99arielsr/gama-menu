import { Model, Schema } from "mongoose";
import { ICardapio } from "../../models/Cardapio";
import { ICategorias } from "../../models/Categoria";
import { ISubcategorias } from "../../models/Subcategoria";
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

  async findOne(id: any) {
    return this.cardapioModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      subcardapio: Schema.Types.ObjectId[] | ISubcategorias[];
    }
  ) {
    await this.cardapioModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.cardapioModel.deleteOne({ _id: id });
  }
}