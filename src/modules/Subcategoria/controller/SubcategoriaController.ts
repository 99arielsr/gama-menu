import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Categoria from "../../../models/Categoria";
import SubcategoriaUseCase from "../useCases/SubcategoriaUseCase";
import { ISubcategorias } from "../../../models/Subcategoria";

export default class CadastroController {
  private useCase: SubcategoriaUseCase;

  constructor(useCase: SubcategoriaUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          nome,
          produtos,
        } = req.body;

        const categoriaExistente = await Categoria.count({
          _id: id,
        });
        if (!categoriaExistente) {
          return res.status(400).json("Categoria não encontrada");
        }
        
        const subcategoria = await this.useCase.criar({
          nome,
          produtos,
        });

        const categoria = await Categoria.findById(id);
        let subcategoriasExistentes: ISubcategorias[] | ObjectId[] = [];

        if (categoria) {
          subcategoriasExistentes = categoria.subcategorias;
        }

        await Categoria.findByIdAndUpdate(id, {
          subcategorias: [
            ...subcategoriasExistentes, 
            subcategoria._id
          ],
        });
        return res.status(201).json(subcategoria);

      } catch (error) {
        return res.status(500).json("ERRO AO CADASTRAR ENDEREÇO");
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const listarTodos = await this.useCase.listar();
        return res.status(200).json(listarTodos);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        if(!id) {
          return res.status(404).json("Envie um Id válido!");
        }

        const listarCardapio = await this.useCase.listarId(id);
        return res.status(200).json(listarCardapio);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        
        if(!id){
          return res.status(404).json("Envie um id válido!");
        }

        const { nome, categorias } = req.body;
        const atualizado = await this.useCase.atualizar(id, {...req.body});
        return res.status(200).json(atualizado);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        if(!id){
          return res.status(404).json("Envie um id válido!");
        }

        await this.useCase.deletar(id);
        return res.status(204).json("Subcategoria deletada");
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}