import BadRequest from "../../../infra/erros/BadRequest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
// import { criptografia } from "../../infra/adapters/criptografia";
// import logger from "../../infra/logger";
import IRepository from "../../../repositories/IRepository";
import Proprietario from "../../../models/Proprietario";

export default class AuthUseCase {
  
  async login(payload: any){
    
    const targetUser = await Proprietario.findOne({email: payload.email});

      if (!targetUser) {
        throw new BadRequest("Usuário ou senha incorretos.", 400);
      }

      if (!bcrypt.compareSync(payload.senha, targetUser.senha)) {
        throw new BadRequest("Usuário ou senha incorretos.", 400);
      }

      const token = jwt.sign(
        {
          id: targetUser.id,
          email: targetUser.email,
          nome: targetUser.nome,
        },
        "BOSSGAMA"
      );

      return token;
  }
}