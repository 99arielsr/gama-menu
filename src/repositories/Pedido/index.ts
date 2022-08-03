import { Model, Schema } from "mongoose";
import { IEndereco } from "../../models/Endereco";
import { IEstabelecimento } from "../../models/Estabelecimento";
import { IPedido } from "../../models/Pedido";
import { IProduto } from "../../models/Produto";
import IRepository from "../IRepository";

export default class PedidoRepository implements IRepository {
  private pedidoModel: any;
  constructor(pedidoModel: Model<IPedido>) {
    this.pedidoModel = pedidoModel;
  }
  async create(payload: {
    cliente: Schema.Types.ObjectId; //| ICliente[];
    enderecoCliente?: Schema.Types.ObjectId | IEndereco;
    produtos: Schema.Types.ObjectId[] | IProduto[];
    entrega: boolean;
    status: string;
  }) {
    return this.pedidoModel.create(payload);
  }

  async find() {
    return this.pedidoModel.find();
  }

  async findOne(id: any) {
    return this.pedidoModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      cliente?: Schema.Types.ObjectId; //| ICliente[];
      enderecoCliente?: Schema.Types.ObjectId | IEndereco;
      produtos?: Schema.Types.ObjectId[] | IProduto[];
      entrega?: boolean;
      status?: string;
    }
  ) {
    await this.pedidoModel.findByIdAndUpdate({ _id: id }, payload);
  }

  async deleteOne(id: any) {
    return await this.pedidoModel.findByIdAndDelete({ _id: id });
  }

  async count(payload: any) {}
}
