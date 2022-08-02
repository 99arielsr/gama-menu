import IRepository from "../../../repositories/IRepository";
import { IProduto } from "../../../models/Produto";
import Subcategoria from "../../../models/Subcategoria";
import BadRequest from "../../../infra/erros/BadRequest";
import { ObjectId } from "mongoose";

type PayloadCadastroProduto = IProduto;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }
  
  async criar(subcategoriaId: string, payload: PayloadCadastroProduto){
    const produtoData = {
      nome: payload.nome,
      descricao: payload.descricao,
      preco: payload.preco,
      imagem: payload.imagem
    }

    const subcategoria = await Subcategoria.findById({
      _id: subcategoriaId,
    });

    if (!subcategoria) {
      throw new BadRequest("Subcategoria não encontrada", 400);
    };

    const produto = await this.repository.create(produtoData);

    let produtoExistente: IProduto[] | ObjectId[] = [];

    if (subcategoria) {
      produtoExistente = subcategoria.produtos;
    };

    await Subcategoria.findByIdAndUpdate(subcategoriaId, {
      produtos: [
        ...produtoExistente,
        produto._id
      ],
    });

    return produto;
  }

  listar() {
    return this.repository.find();
  }

  listarId(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.findOne({_id: id});
  }

  atualizar(id: any, payload: PayloadCadastroProduto) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.update(id, payload);
  }

  deletar(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.deleteOne(id);
  }
}