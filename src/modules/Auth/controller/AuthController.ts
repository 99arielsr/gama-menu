import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
// import logger from "../../infra/logger";
import AuthUseCase from "../useCases/AuthUseCase";
import BadRequest from "../../../infra/erros/BadRequest";

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
}