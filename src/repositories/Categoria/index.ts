import { Model, Schema } from "mongoose";
import { ICategorias } from "../../models/Categoria";
import { ISubcategorias } from "../../models/Subcategoria";
import IRepository from "../IRepository";

export default class CategoriaRepository implements IRepository {
  private categoriaModel: any;
  constructor(categoriaModel: Model<ICategorias>) {
    this.categoriaModel = categoriaModel;
  }
  async create(payload: {
    nome: string;
    subcategoria: Schema.Types.ObjectId[] | ISubcategorias[];
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
      subcategoria: Schema.Types.ObjectId[] | ISubcategorias[];
    }
  ) {
    await this.categoriaModel.findById({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.categoriaModel.deleteOne({ _id: id });
  }
}
