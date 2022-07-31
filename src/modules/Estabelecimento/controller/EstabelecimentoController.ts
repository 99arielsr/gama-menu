import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import BadRequest from "../../../infra/erros/BadRequest";
import EstabelecimentoUseCase from "../useCases/EstabelecimentoUseCase";

export default class EstabelecimentoController {
  private useCase: EstabelecimentoUseCase;

  constructor(useCase: EstabelecimentoUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          nome,
          segmento,
          ativo,
          delivery,
          retirada,
          horario,
          endereco,
          cardapio,
          logo,
        } = req.body;

        const estabelecimento = await this.useCase.criar(id,{
          ...req.body
        });


        return res.status(201).json(estabelecimento);
      } catch (error) {
        if(error instanceof BadRequest){
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("ERRO");
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
        const listarUm = await this.useCase.listarId(id);
        return res.status(200).json(listarUm);
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
        const {           
          nome,
          segmento,
          ativo,
          delivery,
          retirada,
          horario,
          endereco,
          cardapio,
          logo, 
        } = req.body;
        const atualizado = await this.useCase.atualizar(id, {...req.body});
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
        return res.status(204).json("Estabelecimento deletado");
      } catch (error) {
        if(error instanceof BadRequest){
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
