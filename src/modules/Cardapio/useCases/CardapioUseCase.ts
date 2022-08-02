import IRepository from "../../../repositories/IRepository";
import { ICardapio } from "../../../models/Cardapio";
import BadRequest from "../../../infra/erros/BadRequest";
import Estabelecimento from "../../../models/Estabelecimento";
import { ObjectId } from "mongoose";

type PayloadCadastroCardapio = ICardapio;

export default class CardapioUseCase {
  private repository: IRepository;
  constructor(cardapioRepository: IRepository) {
    this.repository = cardapioRepository;
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
    return this.repository.find();
  }

  async listarId(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.findOne({ _id: id });
  }

  async atualizar(id: any, payload: PayloadCadastroCardapio) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.update(id, payload);
  }

  async deletar(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.deleteOne(id);
  }
}
