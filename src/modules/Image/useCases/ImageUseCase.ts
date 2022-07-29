import { IImages } from "../../../models/Images";
import IRepository from "../../../repositories/IRepository";

type PayloadCadastroImage = IImages;

export default class ImageUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  criar(payload: PayloadCadastroImage){
    const imageData = {
      nome: payload.nome,
      link: payload.link,
      descricao: payload.descricao
    }
    return this.repository.create(imageData);
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    return this.repository.findOne(id);
  }

  atualizar(id: any, payload: PayloadCadastroImage) {
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    return this.repository.deleteOne(id);
  }
}