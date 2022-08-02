import IRepository from "../../../repositories/IRepository";
import { ISubcategorias } from "../../../models/Subcategoria";
import Categoria from "../../../models/Categoria";
import BadRequest from "../../../infra/erros/BadRequest";
import { ObjectId } from "mongoose";

type PayloadCadastroCategoria = ISubcategorias;

export default class SubcategoriasUseCase {
  private repository: IRepository;
  constructor(cadastroRepository: IRepository) {
    this.repository = cadastroRepository;
  }

  async criar(categoriaId: string, payload: PayloadCadastroCategoria) {
    const subcategoriasData = {
      nome: payload.nome,
      produtos: payload.produtos,
    };

    const categorias = await Categoria.findById({
      _id: categoriaId,
    });

    if (!categorias) {
      throw new BadRequest("Categoria não encontrada", 400);
    }

    const subcategorias = await this.repository.create(subcategoriasData);

    let subcategoriasExistente: ISubcategorias[] | ObjectId[] = [];

    if (categorias) {
      subcategoriasExistente = categorias.subcategorias;
    }

    await Categoria.findByIdAndUpdate(categoriaId, {
      subcategorias: [...subcategoriasExistente, subcategorias._id],
    });

    return subcategorias;
  }

  async listar() {
    return this.repository.find();
  }

  async listarId(id: any) {
    if (!id) {
      throw new BadRequest("id inválido!", 400);
    }
    return this.repository.findOne(id);
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
