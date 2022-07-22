import { Request, Response } from "express";
import CadastroUseCase from "../useCases/CadastroProprietarioUseCase";
import Proprietario from "../../../models/Proprietario";

export default class CadastroController {
  private useCase: CadastroUseCase;

  constructor(useCase: CadastroUseCase) {
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
          return res.status(400).json("Email já cadastrado no banco");
        }

        const proprietario = await this.useCase.cadastroProprietario({
          nome,
          email,
          senha,
        });

        return res.status(201).json(proprietario);
      } catch (error) {
        return res.status(500).json("ERRO");
      }
    };
  }
}
