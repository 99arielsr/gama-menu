import { Schema } from "mongoose";
import IRepository from "../../../repositories/IRepository";
import IEstabelecimento from "../../../repositories/Estabelecimento/IEstabelecimento";

type PayloadCadastroEstabelecimento = IEstabelecimento;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  cadastroEstabelecimento(payload: PayloadCadastroEstabelecimento){
    const estabelecimentoData = {
      nome: payload.nome,
      segmento: payload.segmento,
      ativo: payload.ativo,
      delivery: payload.delivery,
      retirada: payload.retirada,
      horario: payload.horario,
      endereco: payload.endereco,
      logo: payload.logo
    }
    const novoEstabelecimento = this.repository.create(estabelecimentoData);
    return novoEstabelecimento;
  }
}