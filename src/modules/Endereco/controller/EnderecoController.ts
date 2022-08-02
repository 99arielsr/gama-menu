import { Request, Response } from "express";
import BadRequest from "../../../infra/erros/BadRequest";
import EnderecoUseCase from "../useCases/EnderecoUseCase";

export default class EnderecoController {
  private useCase: EnderecoUseCase;

  constructor(useCase: EnderecoUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          cep,
          logradouro,
          numero,
          complemento,
          referencia,
          bairro,
          cidade,
          estado,
        } = req.body;    

        const endereco = await this.useCase.criar(id,{
          ...req.body
        });

        return res.status(201).json(endereco);
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
        const enderecos = await this.useCase.listar();
        return res.status(200).json(enderecos);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const enderecosId = await this.useCase.listarId(id);
        return res.status(200).json(enderecosId);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const enderecos = await this.useCase.atualizar(id, {...req.body});
        return res.status(200).json(enderecos);
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
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
