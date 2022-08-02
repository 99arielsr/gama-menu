import IRepository from "../../../repositories/IRepository";
import { ICategoria } from "../../../models/Categoria";
import Cardapio from "../../../models/Cardapio";
import BadRequest from "../../../infra/erros/BadRequest";
import { ObjectId } from "mongoose";

type PayloadCadastroCategoria = ICategoria;

export default class CategoriaUseCase {
  private repository: IRepository;
  constructor(categoriaRepository: IRepository) {
    this.repository = categoriaRepository;
  }

  async criar(cardapioId: string, payload: PayloadCadastroCategoria) {
    const categoriasData = {
      nome: payload.nome,
      subcategorias: payload.subcategorias,
    };

    const cardapio = await Cardapio.findById({
      _id: cardapioId,
    });

    if (!cardapio) {
      throw new BadRequest("Estabelecimento não encontrado", 400);
    }

    const categorias = await this.repository.create(categoriasData);

    let categoriaExistente: ICategoria[] | ObjectId[] = [];

    if (cardapio) {
      categoriaExistente = cardapio.categorias;
    }

    await Cardapio.findByIdAndUpdate(cardapioId, {
      categorias: [...categoriaExistente, categorias._id],
    });
    return this.repository.create(categoriasData);
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

  async atualizar(id: any, payload: PayloadCadastroCategoria) {
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
