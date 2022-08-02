import BadRequest from "../../../infra/erros/BadRequest";
import NotFound from "../../../infra/erros/NotFound";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { criptografia } from "../../../infra/adapters/criptografia";
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

  async gerarTokenDeSenha(payload: any){
    const savedUser = await Proprietario.findOne({email: payload.email});

    if(!savedUser) {
      throw new NotFound("Email não encontrado.", 404);
    }

    const token = CryptoJS.AES.encrypt(`${savedUser.email}`, "GAMAMENU").toString();
    //enviar email com o token

    savedUser.hashResetSenha = token;
    await savedUser.save();

    return token;
  }

  async recuperarSenha(payload: any){
    const bytes = CryptoJS.AES.decrypt(payload.token, "GAMAMENU");
    const email = bytes.toString(CryptoJS.enc.Utf8);

    if(!email) {
      throw new BadRequest("token inválido.", 400);
    }

    const savedUser: any = await Proprietario.findOne({email});

    if(!savedUser.hashResetSenha || savedUser.hashResetSenha !== payload.token) {
      throw new BadRequest("token inválido.", 400);
    }

    if(savedUser.hashResetSenha === payload.token) {
      throw new BadRequest("token inválido.", 400);
    }

    if (!savedUser) {
      throw new NotFound("Email não encontrado", 404);
    }

    const novaSenha = await criptografia.hashSync(payload.senha);

    savedUser.senha = novaSenha;
    savedUser.hashResetSenha = null;

    return await savedUser.save();
  }
}