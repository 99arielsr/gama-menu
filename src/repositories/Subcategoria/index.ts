import { Model, Schema } from "mongoose";
import { IProduto } from "../../models/Produto";
import { ISubcategorias } from "../../models/Subcategoria";
import IRepository from "../IRepository";

export default class SubcategoriaRepository implements IRepository {
  private subcategoriaModel: any;
  constructor(subcategoriaModel: Model<ISubcategorias>) {
    this.subcategoriaModel = subcategoriaModel;
  }
  async create(payload: {
    nome: string;
    produtos: Schema.Types.ObjectId[] | IProduto[];
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
      produtos: Schema.Types.ObjectId[] | IProduto[];
    }
  ) {
    await this.subcategoriaModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async deleteOne(id: any) {
    return await this.subcategoriaModel.deleteOne({ _id: id });
  }

  async count(payload:any) {}
}
