import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ICategoria } from "../../../models/Categoria";
import CategoriaUseCase from "../useCases/CategoriaUseCase";
import Cardapio from "../../../models/Cardapio";
import BadRequest from "../../../infra/erros/BadRequest";

export default class CadastroController {
  private useCase: CategoriaUseCase;

  constructor(useCase: CategoriaUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, subcategorias } = req.body;
        const cardapio = await Cardapio.findById(id);

        const categoria = await this.useCase.criar(id, {
          nome,
          subcategorias,
        });

        return res.status(201).json(categoria);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte");
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const listarTodos = await this.useCase.listar();
        return res.status(200).json(listarTodos);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const listarCardapio = await this.useCase.listarId(id);
        return res.status(200).json(listarCardapio);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, categorias } = req.body;
        const atualizado = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(atualizado);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        await this.useCase.deletar(id);
        return res.status(204).json("Categoria deletada");
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
