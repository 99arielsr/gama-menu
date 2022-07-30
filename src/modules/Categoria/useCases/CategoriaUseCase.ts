import IRepository from "../../../repositories/IRepository";
import { ICategoria } from "../../../models/Categoria";

type PayloadCadastroCategoria = ICategoria;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  criar(payload: PayloadCadastroCategoria){
    const cardapioData = {
      nome: payload.nome,
      subcategorias: payload.subcategorias,
    }
    return this.repository.create(cardapioData);
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroCategoria) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.deleteOne(id);
  }
}