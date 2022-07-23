import IRepository from "../../../repositories/IRepository";
import { IEndereco } from "../../../models/Endereco";

type PayloadCadastroEndereco = IEndereco;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  cadastroEndereco(payload: PayloadCadastroEndereco){
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
    const novoEndereco = this.repository.create(enderecoData);
    return novoEndereco;
  }
}