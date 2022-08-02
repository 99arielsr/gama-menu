import { Response, Request } from "express";
// import logger from "../../infra/logger";
import AuthUseCase from "../useCases/AuthUseCase";
import BadRequest from "../../../infra/erros/BadRequest";
import NotFound from "../../../infra/erros/NotFound";

export default class AuthController {
  private useCase: AuthUseCase;

  constructor(useCase: AuthUseCase){
    this.useCase = useCase;
  }

  login() {
    return async (req: Request, res: Response) => {
      try {
        const { email, senha } = req.body;
        const token = await this.useCase.login({...req.body});
        return res.json(token);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }

  gerarTokenDeSenha() {
    return async (req: Request, res: Response) => {
      try {
        const { email } = req.body;
        const token = await this.useCase.gerarTokenDeSenha({...req.body});
        return res.json(token);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        if (error instanceof NotFound) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }

  recuperarSenha() {
    return async (req: Request, res: Response) => {
      try {
        const { token, senha } = req.body;
        const senhaRecuperada = await this.useCase.recuperarSenha({...req.body});
        return res.sendStatus(201);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        if (error instanceof NotFound) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }
}