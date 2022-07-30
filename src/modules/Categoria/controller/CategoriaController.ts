import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ICategoria } from "../../../models/Categoria";
import CategoriaUseCase from "../useCases/CategoriaUseCase";
import Cardapio from "../../../models/Cardapio";

export default class CadastroController {
  private useCase: CategoriaUseCase;

  constructor(useCase: CategoriaUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          nome,
          subcategorias,
        } = req.body;

        const cardapioExistente = await Cardapio.count({
          _id: id,
        });
        if (!cardapioExistente) {
          return res.status(400).json("Cardapio não encontrado");
        }
        
        const categoria = await this.useCase.criar({
          nome,
          subcategorias,
        });

        const cardapio = await Cardapio.findById(id);
        let categoriasExistentes: ICategoria[] | ObjectId[] = [];

        if (cardapio) {
          categoriasExistentes = cardapio.categorias;
          
          await Cardapio.findByIdAndUpdate(id, {
            categorias: [...categoriasExistentes, categoria._id],
          });

          return res.status(201).json(categoria);
        } else {
          return res.status(404).json("Envie um id válido!");
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
        return res.status(204).json("Categoria deletada");
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}