import { Response, Request } from "express";
import bcrypty from "bcryptjs";
import IRepository from "../../../repositories/IRepository";
import { criptografia } from "../../../infra/adapters/criptografia";
import BadRequest from "../../../infra/erros/BadRequest";

type PayloadCadastroProprietario = {
  nome: string;
  email: string;
  senha: string;
};

export default class ProprietarioUseCase {
  private repository: IRepository;
  constructor(proprietarioRepository: IRepository) {
    this.repository = proprietarioRepository;
  }
  async criar(payload: PayloadCadastroProprietario) {
    const novaSenha = await criptografia.hashSync(payload.senha);
    return this.repository.create({ ...payload, senha: novaSenha });
  }

  async listar() {
    const lista = await this.repository.find();
    return lista;
  }

  async listarId(id: any) {
    const listado = await this.repository.findOne({ _id: id });
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return listado;
  }

  async atualizar(id: any, payload: PayloadCadastroProprietario) {
    const atualizado = await this.repository.update(id, payload);

    if(!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return atualizado;
  }

  async deletar(id: any) {
    const deletado = await this.repository.deleteOne(id);

    if(!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return deletado;
  }
}
