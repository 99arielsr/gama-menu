import { IEstabelecimento } from "../../../models/Estabelecimento";
import IRepository from "../../../repositories/IRepository";

type PayloadCadastroEstabelecimento = IEstabelecimento;

export default class EstabelecimentoUseCase {
  private repository: IRepository;
  constructor(estabelecimentoRepository: IRepository) {
    this.repository = estabelecimentoRepository;
  }
  cadastroEstabelecimento(payload: PayloadCadastroEstabelecimento) {
    const estabelecimentoData = [
      {
        nome: payload.nome,
        segmento: payload.segmento,
        ativo: payload.ativo,
        delivery: payload.delivery,
        retirada: payload.retirada,
        horario: payload.horario,
        endereco: payload.endereco,
        logo: payload.logo,
      },
    ];
    const novoEstabelecimento = this.repository.create(estabelecimentoData);
    return novoEstabelecimento;
  }

  listarEstabelecimento() {
    return this.repository.find();
  }
}
