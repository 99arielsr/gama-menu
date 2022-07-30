import IRepository from "../../../repositories/IRepository";
import { ICardapio } from "../../../models/Cardapio";

type PayloadCadastroCardapio = ICardapio;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  criar(payload: PayloadCadastroCardapio){
    const cardapioData = {
      nome: payload.nome,
    }
    return this.repository.create(cardapioData);
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroCardapio) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.deleteOne(id);
  }
}