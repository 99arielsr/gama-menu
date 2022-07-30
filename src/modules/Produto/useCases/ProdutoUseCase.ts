import IRepository from "../../../repositories/IRepository";
import { IProduto } from "../../../models/Produto";

type PayloadCadastroProduto = IProduto;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  criar(payload: PayloadCadastroProduto){
    const produtoData = {
      nome: payload.nome,
      descricao: payload.descricao,
      preco: payload.preco,
      imagem: payload.imagem
    }
    return this.repository.create(produtoData);
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroProduto) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.deleteOne(id);
  }
}