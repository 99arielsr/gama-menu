import { Model, Schema } from "mongoose";
import { IImages } from "../../models/Images";
import { IProduto } from "../../models/Produto";
import IRepository from "../IRepository";

export default class ProdutoRepository implements IRepository {
  private produtoModel: any;
  constructor(produtoModel: Model<IProduto>) {
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
    await this.produtoModel.findByIdAndUpdate({_id: id}, payload);
  }

  async deleteOne(id: any) {
    return await this.produtoModel.findByIdAndDelete({_id: id});
  }

  async count(payload:any) {}
}
