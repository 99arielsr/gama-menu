import IRepository from "../../../repositories/IRepository";
import bcrypty from "bcryptjs";
import { criptografia } from "../../../infra/adapters/criptografia";

type PayloadCadastroProprietario = {
  nome: string,
  email: string,
  senha: string,
};

export default class ProprietarioUseCase {
  private repository: IRepository;
  constructor(proprietarioRepository: IRepository) {
    this.repository = proprietarioRepository;
  }
  cadastroProprietario(payload: PayloadCadastroProprietario){

    const novaSenha = criptografia.hash(payload.senha);
    const novoProprietario = this.repository.create({...payload, senha: novaSenha});
    return novoProprietario;
  }

  listarProprietarios() {
    const listarTodos = this.repository.find();
    return listarTodos;
  }
}