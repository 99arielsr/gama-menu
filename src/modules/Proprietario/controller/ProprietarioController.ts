import { request, Request, Response } from "express";
import ProprietarioUseCase from "../useCases/ProprietarioUseCase";
import Proprietario from "../../../models/Proprietario";
import BadRequest from "../../../infra/erros/BadRequest";

export default class ProprietarioController {
  private useCase: ProprietarioUseCase;

  constructor(useCase: ProprietarioUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { nome, email, senha } = req.body;
        const proprietario = await this.useCase.criar({
          nome,
          email,
          senha,
        });

        return res.status(201).json(proprietario);
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
        const listarProprietario = await this.useCase.listarId(id);
        return res.status(200).json(listarProprietario);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suprote!");
      }
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const atualizado = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(atualizado);
      } catch (error) {
        if(error instanceof BadRequest){
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
        return res.status(204).json("Proprietario deletado");
      } catch (error) {
        if(error instanceof BadRequest){
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
