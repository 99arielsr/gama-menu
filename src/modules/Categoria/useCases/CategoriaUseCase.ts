import IRepository from "../../../repositories/IRepository";
import { ICategoria } from "../../../models/Categoria";
import Cardapio from "../../../models/Cardapio";
import BadRequest from "../../../infra/erros/BadRequest";
import { ObjectId } from "mongoose";

type PayloadCadastroCategoria = ICategoria;

export default class CadastroUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
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

  async atualizar(id: any, payload: PayloadCadastroCategoria) {
    const atualizado = await this.repository.update(id, payload);

    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return atualizado;
  }

  async deletar(id: any) {
    const deletado = await this.repository.deleteOne(id);
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return deletado;
  }
}
