import { Model, Schema } from "mongoose";
import { IProdutos } from "../../models/Produto";
import { ISubcategorias } from "../../models/Subcategoria";
import IRepository from "../IRepository";

export default class SubcategoriaRepository implements IRepository {
  private subcategoriaModel: any;
  constructor(subcategoriaModel: Model<ISubcategorias>) {
    this.subcategoriaModel = subcategoriaModel;
  }
  async create(
    payload: { 
      nome: string;
      produtos: Schema.Types.ObjectId[] | IProdutos[]; 
    }
  ){
    return this.subcategoriaModel.create(payload);
  }
  
  async find() {
    return this.subcategoriaModel.find();
  }
  
  async update(payload: any) {}
  async findOne(payload: any) {}
  async delete(id: any) {}
}