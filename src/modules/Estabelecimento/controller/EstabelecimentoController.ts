import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import BadRequest from "../../../infra/erros/badRequest";
import { IEstabelecimento } from "../../../models/Estabelecimento";
import Proprietario from "../../../models/Proprietario";
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
          nome,
          segmento,
          ativo,
          delivery,
          retirada,
          horario,
          endereco,
          cardapio,
          logo,
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

        if(!id) {
          return res.status(404).json("Envie um Id válido!");
        }

        const listarUm = await this.useCase.listarId(id);
        return res.status(200).json(listarUm);
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

        const { nome, email, senha } = req.body;
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
        return res.status(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
