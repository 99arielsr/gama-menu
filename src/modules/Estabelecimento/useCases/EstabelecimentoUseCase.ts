import { ObjectId } from "mongoose";
import BadRequest from "../../../infra/erros/BadRequest";
import { IEstabelecimento } from "../../../models/Estabelecimento";
import Proprietario from "../../../models/Proprietario";
import IRepository from "../../../repositories/IRepository";

type PayloadCadastroEstabelecimento = IEstabelecimento;

export default class EstabelecimentoUseCase {
  private repository: IRepository;
  constructor(estabelecimentoRepository: IRepository) {
    this.repository = estabelecimentoRepository;
  }

  async criar(proprietarioId: string, payload: PayloadCadastroEstabelecimento) {
    const estabelecimentoData =
      {
        nome: payload.nome,
        segmento: payload.segmento,
        ativo: payload.ativo,
        delivery: payload.delivery,
        retirada: payload.retirada,
        horario: payload.horario,
        endereco: payload.endereco,
        cardapio: payload.cardapio,
        logo: payload.logo,
      }

      const proprietario = await Proprietario.findById({
        _id: proprietarioId,
      });

      if (!proprietario) {
        throw new BadRequest("Proprietário não encontrado", 400);
      }

      const estabelecimento = await this.repository.create(estabelecimentoData)

      let estabelecimentoExistente: IEstabelecimento[] | ObjectId[] = [];

      if (proprietario) {
        estabelecimentoExistente = proprietario.estabelecimento;
      }

      await Proprietario.findByIdAndUpdate(proprietarioId, {
        estabelecimento: [
          ...estabelecimentoExistente, 
          estabelecimento._id
        ],
      });

    return estabelecimento;
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

  async atualizar(id: any, payload: PayloadCadastroEstabelecimento) {
    const atualizado = await this.repository.update(id, payload);

    if(!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return atualizado;
  }

  async deletar(id: any) {
    const deletado = await this.repository.deleteOne(id);

    if(!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return deletado;
  }
}