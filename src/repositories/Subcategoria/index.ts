import { Model, Schema } from "mongoose";
import { IProdutos } from "../../models/Produto";
import { ISubcategorias } from "../../models/Subcategoria";
import IRepository from "../IRepository";

export default class SubcategoriaRepository implements IRepository {
  private subcategoriaModel: any;
  constructor(subcategoriaModel: Model<ISubcategorias>) {
    this.subcategoriaModel = subcategoriaModel;
  }
  async create(payload: {
    nome: string;
    produtos: Schema.Types.ObjectId[] | IProdutos[];
  }) {
    return this.subcategoriaModel.create(payload);
  }

  async find() {
    return this.subcategoriaModel.find();
  }

  async findOne(id: any) {
    return this.subcategoriaModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      produtos: Schema.Types.ObjectId[] | IProdutos[];
    }
  ) {
    await this.subcategoriaModel.findById({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.subcategoriaModel.deleteOne({ _id: id });
  }
}
