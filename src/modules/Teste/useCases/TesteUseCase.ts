import IRepository from "../../../repositories/IRepository";
import { criptografia } from "../../../infra/adapters/criptografia";
import BadRequest from "../../../infra/erros/BadRequest";

type PayloadTeste = {
  name: string;
  email: string;
  password: string;
};

export default class TesteUseCase {
  private repository: IRepository;
  constructor(testeRepository: IRepository) {
    this.repository = testeRepository;
  }
  async criar(payload: PayloadTeste) {
    const emailCadastrado = await this.repository.count({
      email: payload.email,
    });
    if (emailCadastrado) {
      throw new BadRequest("Email já cadastrado.", 400);
    }
    const novaSenha = await criptografia.hashSync(payload.password);
    return this.repository.create({ ...payload, password: novaSenha });
  }

  async listar() {
    return this.repository.find();
  }

  async listarId(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.findOne({ _id: id });
  }

  async atualizar(id: any, payload: PayloadTeste) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.update(id, payload);
  }

  async deletar(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.deleteOne(id);
  }
}
