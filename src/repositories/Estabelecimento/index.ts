import { Model, Schema } from "mongoose";
import { ICardapio } from "../../models/Cardapio";
import { IEndereco } from "../../models/Endereco";
import { IEstabelecimento } from "../../models/Estabelecimento";
import { IHorario } from "../../models/Horario";
import { IImages } from "../../models/Images";
import IRepository from "../IRepository";

export default class EstabelecimentoRepository implements IRepository {
  private estabelecimentoModel: any;
  constructor(estabelecimentoModel: Model<IEstabelecimento>) {
    this.estabelecimentoModel = estabelecimentoModel;
  }
  async create(payload: {
    nome: string;
    segmento: string;
    logo: Schema.Types.ObjectId[] | IImages[];
    endereco: Schema.Types.ObjectId[] | IEndereco[];
    cardapio: Schema.Types.ObjectId[] | ICardapio[];
    ativo: boolean;
    horario: Schema.Types.ObjectId[] | IHorario[];
    delivery: boolean;
    retirada: boolean;
  }) {
    return this.estabelecimentoModel.create(payload);
  }

  async find() {
    return this.estabelecimentoModel.find();
  }

  async findOne(id: any) {
    return this.estabelecimentoModel.findById(id);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      segmento: string;
      logo: Schema.Types.ObjectId[] | IImages[];
      endereco: Schema.Types.ObjectId[] | IEndereco[];
      cardapio: Schema.Types.ObjectId[] | ICardapio[];
      ativo: boolean;
      horario: Schema.Types.ObjectId[] | IHorario[];
      delivery: boolean;
      retirada: boolean;
    }
  ) {
    await this.estabelecimentoModel.findByIdAndUpdate({_id: id}, payload);
  }

  async deleteOne(id: any) {
    return await this.estabelecimentoModel.findByIdAndDelete({_id: id});
  }

  async count(payload:any) {}
}
