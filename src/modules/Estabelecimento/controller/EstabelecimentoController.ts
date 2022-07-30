import { Request, Response } from "express";
import { ObjectId } from "mongoose";
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

        const proprietarioExistente = await Proprietario.count({
          id,
        });

        if (proprietarioExistente == 0) {
          return res.status(400).json("Proprietário não encontrado");
        }

        const estabelecimento = await this.useCase.criar({
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

        let proprietario = await Proprietario.findById(id);
        let estabelecimentoExistente: IEstabelecimento[] | ObjectId[] = [];

        if (proprietario) {
          estabelecimentoExistente = proprietario.estabelecimento;
        }

        await Proprietario.findByIdAndUpdate(id, {
          estabelecimento: [...estabelecimentoExistente, estabelecimento.id],
        });

        return res.status(201).json(estabelecimento);
      } catch (error) {
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
