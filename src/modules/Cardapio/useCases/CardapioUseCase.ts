import IRepository from "../../../repositories/IRepository";
import { ICardapio } from "../../../models/Cardapio";
import BadRequest from "../../../infra/erros/BadRequest";
import Estabelecimento from "../../../models/Estabelecimento";
import { ObjectId } from "mongoose";

type PayloadCadastroCardapio = ICardapio;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }

  async criar(estabelecimentoId: string, payload: PayloadCadastroCardapio) {
    const cardapioData = {
      nome: payload.nome,
    };

    const estabelecimento = await Estabelecimento.findById({
      _id: estabelecimentoId,
    });

    if (!estabelecimento) {
      throw new BadRequest("Estabelecimento não encontrado", 400);
    }

    const cardapio = await this.repository.create(cardapioData);

    let cardapioExistente: ICardapio[] | ObjectId[] = [];

    if (estabelecimento) {
      cardapioExistente = estabelecimento.cardapio;
    }

    await Estabelecimento.findByIdAndUpdate(estabelecimentoId, {
      cardapio: [...cardapioExistente, cardapio._id],
    });
    return this.repository.create(cardapioData);
  }

  async listar() {
    const lista = await this.repository.find();
    return lista;
  }

  async listarId(id: any) {
    const listado = await this.repository.findOne({ _id: id });
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return listado;
  }

  async atualizar(id: any, payload: PayloadCadastroCardapio) {
    const atualizado = await this.repository.update(id, payload);

    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return atualizado;
  }

  async deletar(id: any) {
    const deletado = await this.repository.deleteOne(id);
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return deletado;
  }
}
