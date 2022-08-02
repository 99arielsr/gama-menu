import { Request, Response } from "express";
import BadRequest from "../../../infra/erros/BadRequest";
import SubcategoriasUseCase from "../useCases/SubcategoriaUseCase";

export default class SubcategoriasController {
  private useCase: SubcategoriasUseCase;

  constructor(useCase: SubcategoriasUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, produtos } = req.body;

        const subcategoria = await this.useCase.criar(id, {
          ...req.body,
        });

        return res.status(201).json(subcategoria);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const subcategorias = await this.useCase.listar();
        return res.status(200).json(subcategorias);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const subcategoriasId = await this.useCase.listarId(id);
        return res.status(200).json(subcategoriasId);
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
        const subcategorias = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(subcategorias);
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
