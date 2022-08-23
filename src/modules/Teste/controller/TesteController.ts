import { request, Request, Response } from "express";
import TesteUseCase from "../useCases/TesteUseCase";
import BadRequest from "../../../infra/erros/BadRequest";

export default class TesteController {
  private useCase: TesteUseCase;

  constructor(useCase: TesteUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { name, email, password } = req.body;
        const teste = await this.useCase.criar({
          ...req.body
        });

        return res.status(201).json(teste);
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
        const teste = await this.useCase.listar();
        return res.status(200).json(teste);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const testeId = await this.useCase.listarId(id);
        return res.status(200).json(testeId);
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
        const teste = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(teste);
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
        return res.status(204).json();
      } catch (error) {
        if(error instanceof BadRequest){
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
