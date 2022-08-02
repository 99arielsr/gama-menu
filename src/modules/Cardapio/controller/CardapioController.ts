import { Request, Response } from "express";
import CardapioUseCase from "../useCases/CardapioUseCase";
import Estabelecimento from "../../../models/Estabelecimento";
import BadRequest from "../../../infra/erros/BadRequest";

export default class CardapioController {
  private useCase: CardapioUseCase;

  constructor(useCase: CardapioUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, categorias } = req.body;
        const estabelecimento = await Estabelecimento.findById(id);

        const cardapio = await this.useCase.criar(id, {
          ...req.body
        });

        return res.status(201).json(cardapio);
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
        const cardapios = await this.useCase.listar();
        return res.status(200).json(cardapios);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const cardapiosId = await this.useCase.listarId(id);
        return res.status(200).json(cardapiosId);
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
        const cardapios = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(cardapios);
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
