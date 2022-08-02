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

    const emailCadastrado = await this.repository.count({email: payload.email});
    if (emailCadastrado) {
      throw new BadRequest("Email já cadastrado.", 400);
    }
    const novaSenha = await criptografia.hashSync(payload.senha);
    return this.repository.create({ ...payload, senha: novaSenha });
  }

  async listar() {
    return this.repository.find();
  }

  async listarId(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.findOne({_id: id});
  }

  async atualizar(id: any, payload: PayloadCadastroProprietario) {
    if(!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.update(id, payload);
  }

  async deletar(id: any) {
    if(!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.deleteOne(id);
  }
}
