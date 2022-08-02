import { Request, Response } from "express";
import CategoriaUseCase from "../useCases/CategoriaUseCase";
import BadRequest from "../../../infra/erros/BadRequest";

export default class CategoriaController {
  private useCase: CategoriaUseCase;

  constructor(useCase: CategoriaUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome } = req.body;

        const categoria = await this.useCase.criar(id, {
          ...req.body
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
        const categorias = await this.useCase.listar();
        return res.status(200).json(categorias);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const categoriasId = await this.useCase.listarId(id);
        return res.status(200).json(categoriasId);
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
        const { nome } = req.body;
        const categorias = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(categorias);
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
        return res.status(204).json();
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
