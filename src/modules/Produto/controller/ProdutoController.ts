import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Categoria from "../../../models/Categoria";
import ProdutoUseCase from "../useCases/ProdutoUseCase";
import Subcategoria, { ISubcategorias } from "../../../models/Subcategoria";
import { IProduto } from "../../../models/Produto";

export default class CadastroController {
  private useCase: ProdutoUseCase;

  constructor(useCase: ProdutoUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const {
          nome,
          descricao,
          preco,
          imagem
        } = req.body;

        const subcategoriaExistente = await Subcategoria.count({
          _id: id,
        });
        if (!subcategoriaExistente) {
          return res.status(400).json("Subcategoria não encontrada");
        }
        
        const produto = await this.useCase.criar({
          nome,
          descricao,
          preco,
          imagem
        });

        const subcategoria = await Subcategoria.findById(id);
        let produtosExistentes: IProduto[] | ObjectId[] = [];

        if (subcategoria) {
          produtosExistentes = subcategoria.produtos;
        }

        await Subcategoria.findByIdAndUpdate(id, {
          produtos: [
            ...produtosExistentes, 
            produto._id
          ],
        });
        return res.status(201).json(produto);

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