import { Request, Response } from "express";
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

        const estabelecimentos = await this.useCase.criar(id,{
          ...req.body
        });

        return res.status(201).json(estabelecimentos);
      } catch (error) {
        if(error instanceof BadRequest){
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const estabelecimentos = await this.useCase.listar();
        return res.status(200).json(estabelecimentos);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const estabelecimentosId = await this.useCase.listarId(id);
        return res.status(200).json(estabelecimentosId);
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
        const estabelecimentos = await this.useCase.atualizar(id, {...req.body});
        return res.status(200).json(estabelecimentos);
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
