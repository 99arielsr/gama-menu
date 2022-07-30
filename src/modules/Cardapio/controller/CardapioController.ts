import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ICardapio } from "../../../models/Cardapio";
import CardapioUseCase from "../useCases/CardapioUseCase";
import Estabelecimento from "../../../models/Estabelecimento";

export default class CadastroController {
  private useCase: CardapioUseCase;

  constructor(useCase: CardapioUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          nome,
          categorias,
        } = req.body;

        const estabelecimentoExistente = await Estabelecimento.count({
          _id: id,
        });
        if (!estabelecimentoExistente) {
          return res.status(400).json("Estabelecimento não encontrado");
        }
        
        const cardapio = await this.useCase.criar({
          nome,
          categorias,
        });

        const estabelecimento = await Estabelecimento.findById(id);
        let cardapioExistente: ICardapio[] | ObjectId[] = [];

        if (estabelecimento) {
          cardapioExistente = estabelecimento.cardapio
          await Estabelecimento.findByIdAndUpdate(id, {
            cardapio: [...cardapioExistente, cardapio._id],
          });
          return res.status(201).json(cardapio);
        }

      } catch (error) {
        return res.status(500).json("ERRO AO CADASTRAR ENDEREÇO");
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

        const listarCardapio = await this.useCase.listarId(id);
        return res.status(200).json(listarCardapio);
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

        const { nome, categorias } = req.body;
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