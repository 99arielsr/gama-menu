import { IEstabelecimento } from "../../../models/Estabelecimento";
import IRepository from "../../../repositories/IRepository";

type PayloadCadastroEstabelecimento = IEstabelecimento;

export default class EstabelecimentoUseCase {
  private repository: IRepository;
  constructor(estabelecimentoRepository: IRepository) {
    this.repository = estabelecimentoRepository;
  }
  criar(payload: PayloadCadastroEstabelecimento) {
    const estabelecimentoData = [
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
      },
    ];
    return this.repository.create(estabelecimentoData);
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
    return this.repository.delete(id);
  }
}
