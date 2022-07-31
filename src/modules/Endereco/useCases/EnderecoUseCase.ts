import { ObjectId } from "mongoose";
import IRepository from "../../../repositories/IRepository";
import { IEndereco } from "../../../models/Endereco";
import Estabelecimento from "../../../models/Estabelecimento";
import BadRequest from "../../../infra/erros/BadRequest";

type PayloadCadastroEndereco = IEndereco;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
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
    const lista = await this.repository.find();
    return lista
  }

 async  listarId(id: any) {
  const listado = await this.repository.findOne(id);

    if(!id) {
      throw new BadRequest("Envie um Id válido!", 404);
    }
    return listado
  }

 async atualizar(id: any, payload: PayloadCadastroEndereco) {
    const atualizado = await this.repository.update(id, payload);
    if(!id){
      throw new BadRequest("Envie um id válido!", 404);
    }
    return atualizado
  }

 async deletar(id: any) {
    const deletado = await this.repository.deleteOne(id);
    if(!id){
      throw new BadRequest("Envie um id válido!", 404);
    }
    return deletado
  }
}