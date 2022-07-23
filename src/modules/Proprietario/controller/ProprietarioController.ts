import { Request, Response } from "express";
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
        const { nome, email, senha } =
          req.body;

        const savedProprietario = await Proprietario.count({
          email,
        });

        if (savedProprietario) {
          return res.status(400).json("Email já cadastrado no banco.");
        }

        const proprietario = await this.useCase.cadastroProprietario({
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
        const listarTodos = await this.useCase.listarProprietarios();
        return res.status(200).json(listarTodos);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }
}
