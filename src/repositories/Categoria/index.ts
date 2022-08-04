import { Model, Schema } from "mongoose";
import { ICategoria } from "../../models/Categoria";
import { ISubcategorias } from "../../models/Subcategoria";
import IRepository from "../IRepository";

export default class CategoriaRepository implements IRepository {
  private categoriaModel: any;
  constructor(categoriaModel: Model<ICategoria>) {
    this.categoriaModel = categoriaModel;
  }
  async create(payload: {
    nome: string;
    subcategoria?: Schema.Types.ObjectId[] | ISubcategorias[];
  }) {
    return this.categoriaModel.create(payload);
  }

  async find() {
    return this.categoriaModel.find();
  }

  async findOne(id: any) {
    return this.categoriaModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      subcategoria?: Schema.Types.ObjectId[] | ISubcategorias[];
    }
  ) {
    return await this.categoriaModel.findByIdAndUpdate({_id: id}, payload);
  }

  async deleteOne(id: any) {
    return await this.categoriaModel.findByIdAndDelete({_id: id});
  }

  async count(payload:any) {}
}
