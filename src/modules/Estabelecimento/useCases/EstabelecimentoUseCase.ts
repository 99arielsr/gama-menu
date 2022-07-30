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

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroEstabelecimento) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.deleteOne(id);
  }
}
