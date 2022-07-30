import { request, Request, Response } from "express";
import ProprietarioUseCase from "../useCases/ProprietarioUseCase";
import Proprietario from "../../../models/Proprietario";

export default class ProprietarioController {
  private useCase: ProprietarioUseCase;

  constructor(useCase: ProprietarioUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { nome, email, senha } = req.body;

        const savedProprietario = await Proprietario.count({
          email,
        });

        if (savedProprietario) {
          return res.status(400).json("Email já cadastrado no banco.");
        }

        const proprietario = await this.useCase.criar({
          ...req.body,
        });

        return res.status(201).json(proprietario);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
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

        if(!id){
          return res.status(404).json("Envie um id válido!");
        }

        const listarProprietario = await this.useCase.listarId(id);
        return res.status(200).json(listarProprietario);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suprote!");
      }
    };
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
        return res.status(204).json("Proprietario deletado");
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
