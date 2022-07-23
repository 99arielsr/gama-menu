import IRepository from "../../../repositories/IRepository";

type PayloadCadastroProprietario = {
  nome: string,
  email: string,
  senha: string,
};

export default class ProprietarioUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  cadastroProprietario(payload: PayloadCadastroProprietario){
    const proprietarioData = {
      nome: payload.nome,
      email: payload.email,
      senha: payload.senha
    }
    const novoProprietario = this.repository.create(proprietarioData);
    return novoProprietario;
  }
}