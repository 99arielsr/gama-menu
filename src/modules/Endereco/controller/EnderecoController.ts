import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { IEndereco } from "../../../models/Endereco";
import Estabelecimento from "../../../models/Estabelecimento";
import EnderecoUseCase from "../useCases/EnderecoUseCase";

export default class CadastroController {
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
          cep,
          logradouro,
          numero,
          complemento,
          referencia,
          bairro,
          cidade,
          estado,
        });

       /* let estabelecimento = await Estabelecimento.findById(id); */
        

        return res.status(201).json(endereco);
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
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const listarEstabelecimento = await this.useCase.listarId(id);
        return res.status(200).json(listarEstabelecimento);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const { nome, email, senha } = req.body;
        const atualizado = await this.useCase.atualizar(id, {...req.body});
        return res.status(200).json(atualizado);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        await this.useCase.deletar(id);
        return res.status(204).json("Endeço deletado");
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
