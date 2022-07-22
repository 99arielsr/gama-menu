import { Request, Response } from "express";
import CadastroUseCase from "../useCases/CadastroUseCase";
import Proprietario from "../../../models/Proprietario";
import Estabelecimento from "../../../models/Estabelecimento";

export default class CadastroController {
  private useCase: CadastroUseCase;

  constructor(useCase: CadastroUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { nome, email, senha, hashResetSenha, estabelecimento } =
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
          hashResetSenha,
          estabelecimento,
        });

        return res.status(201).json(proprietario);
      } catch (error) {
        return res.status(500).json("ERRO");
      }
    };
  }
}
