import IRepository from "../../../repositories/IRepository";
import { IEndereco } from "../../../models/Endereco";

type PayloadCadastroEndereco = IEndereco;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  criar(payload: PayloadCadastroEndereco){
    const enderecoData = {
      cep: payload.cep,
      logradouro: payload.logradouro,
      numero: payload.numero,
      complemento: payload.complemento,
      referencia: payload.referencia,
      bairro: payload.bairro,
      cidade: payload.cidade,
      estado: payload.estado,
    }
    return this.repository.create(enderecoData);
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroEndereco) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.delete(id);
  }
}