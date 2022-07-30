import { Response, Request } from "express";
import bcrypty from "bcryptjs";
import IRepository from "../../../repositories/IRepository";
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
  criar(payload: PayloadCadastroProprietario){
    const novaSenha = criptografia.hashSync(payload.senha);
    return this.repository.create({...payload, senha: novaSenha});
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroProprietario) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.deleteOne(id);
  }
}