import BadRequest from "../../../infra/erros/BadRequest";
import NotFound from "../../../infra/erros/NotFound";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { criptografia } from "../../../infra/adapters/criptografia";
import Proprietario from "../../../models/Proprietario";
import logger from "../../../infra/logger";
import ENV from "../../../infra/config/env";

export default class AuthUseCase {
  
  async login(payload: any){
    const targetUser = await Proprietario.findOne({email: payload.email});
    logger.info(`[login] user body=${JSON.stringify(targetUser)}`);

      if (!targetUser) {
        logger.error(`[login] Email inválido.`);
        throw new BadRequest("Usuário ou senha incorretos.", 400);
      }

      if (!bcrypt.compareSync(payload.senha, targetUser.senha)) {
        logger.error(`[login] Senha inválida =${JSON.stringify(payload.senha)}`);
        throw new BadRequest("Usuário ou senha incorretos.", 400);
      }

      const token = jwt.sign(
        {
          id: targetUser.id,
          email: targetUser.email,
          nome: targetUser.nome,
        },
        ENV.SECRET
      );

      return token;
  }

  async gerarTokenDeSenha(payload: any){
    const savedUser = await Proprietario.findOne({email: payload.email});
    logger.info(`[gerarTokenDeSenha] user body=${JSON.stringify(savedUser)}`);

    if(!savedUser) {
      logger.error(`[gerarTokenDeSenha] user not found`);
      throw new NotFound("Email não encontrado.", 404);
    }

    logger.info(`[gerarTokenDeSenha] user =${JSON.stringify(savedUser)}`);

    const token = CryptoJS.AES.encrypt(`${savedUser.email}`, ENV.SECRET).toString();
    //enviar email com o token

    savedUser.hashResetSenha = token;
    await savedUser.save();
    logger.info(`[gerarTokenDeSenha] user=${JSON.stringify(savedUser)}`);
    return token;
  }

  async recuperarSenha(payload: any){
    const bytes = CryptoJS.AES.decrypt(payload.token, ENV.SECRET);
    const email = bytes.toString(CryptoJS.enc.Utf8);

    if(!email) {
      logger.error(`[recuperarSenha] token inválido, pois não existe o email`);
      throw new BadRequest("token inválido.", 400);
    }

    const savedUser: any = await Proprietario.findOne({email});

    if (!savedUser) {
      logger.error(`[recuperarSenha] Email não encontrado email = ${email}`);
      throw new NotFound("Email não encontrado", 404);
    }

    if(!savedUser.hashResetSenha || savedUser.hashResetSenha !== payload.token) {
      logger.error(`[recuperarSenha] token diferente ou não existe no banco de dados`);
      throw new BadRequest("token inválido.", 400);
    }

    const novaSenha = await criptografia.hashSync(payload.senha);

    savedUser.senha = novaSenha;
    savedUser.hashResetSenha = null;

    return await savedUser.save();
  }
}