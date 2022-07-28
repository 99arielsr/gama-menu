import { Model, Schema } from "mongoose";
import { IImages } from "../../models/Images";
import { IProdutos } from "../../models/Produto";
import IRepository from "../IRepository";

export default class ProdutoRepository implements IRepository {
  private produtoModel: any;
  constructor(produtoModel: Model<IProdutos>) {
    this.produtoModel = produtoModel;
  }
  async create(payload: {
    nome: string;
    descricao: string;
    preco: number;
    imagem: Schema.Types.ObjectId[] | IImages[];
  }) {
    return this.produtoModel.create(payload);
  }

  async find() {
    return this.produtoModel.find();
  }

  async findOne(id: any) {
    return this.produtoModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      descricao: string;
      preco: number;
      imagem: Schema.Types.ObjectId[] | IImages[];
    }
  ) {
    await this.produtoModel.findById({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.produtoModel.deleteOne({ _id: id });
  }
}
