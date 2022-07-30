import IRepository from "../../../repositories/IRepository";
import { ISubcategorias } from "../../../models/Subcategoria";

type PayloadCadastroCategoria = ISubcategorias;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  criar(payload: PayloadCadastroCategoria){
    const subcategoriaData = {
      nome: payload.nome,
      produtos: payload.produtos,
    }
    return this.repository.create(subcategoriaData);
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