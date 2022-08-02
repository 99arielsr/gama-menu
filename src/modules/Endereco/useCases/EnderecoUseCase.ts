import { ObjectId } from "mongoose";
import IRepository from "../../../repositories/IRepository";
import { IEndereco } from "../../../models/Endereco";
import Estabelecimento from "../../../models/Estabelecimento";
import BadRequest from "../../../infra/erros/BadRequest";

type PayloadCadastroEndereco = IEndereco;

export default class EnderecoUseCase {
  private repository: IRepository;
  constructor(enderecoRepository: IRepository) {
    this.repository = enderecoRepository;
  }
  
  async criar(enderecoId: string, payload: PayloadCadastroEndereco){
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

    const estabelecimentoExistente = await Estabelecimento.findById({
      _id: enderecoId,
    });

    if (!estabelecimentoExistente) {
      throw new BadRequest("Estabelecimento não encontrado", 400);
    }

    const endereco = await this.repository.create(enderecoData)

    let enderecoExistente: IEndereco[] | ObjectId[] = [];

    if (endereco) {
      enderecoExistente = estabelecimentoExistente.endereco;
    }

    await Estabelecimento.findByIdAndUpdate(enderecoId, {
      endereco: [
        ...enderecoExistente, 
        endereco._id],
    });

    return endereco
  }

  async listar() {
    return this.repository.find();
  }

 async  listarId(id: any) {
    if(!id) {
      throw new BadRequest("Envie um Id válido!", 404);
    }
    return this.repository.findOne({_id: id});
  }

 async atualizar(id: any, payload: PayloadCadastroEndereco) {
    if(!id){
      throw new BadRequest("Envie um id válido!", 404);
    }
    return this.repository.update(id, payload);
  }

 async deletar(id: any) {
    if(!id){
      throw new BadRequest("Envie um id válido!", 404);
    }
    return this.repository.deleteOne(id);
  }
}