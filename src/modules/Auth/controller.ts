import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import Proprietario from "../../models/Proprietario";
import { criptografia } from "../../infra/adapters/criptografia";

import logger from "../../infra/logger";
const controller = {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

    const targetUser = await Proprietario.findOne({
      select: {
        email,
      },
    });

    if (!targetUser) {
      return res.status(400).json("Email não cadastrado!");
    }

    if (!bcrypt.compareSync(senha, targetUser.senha)) {
      return res.status(401).json("Senha invalida!");
    }

    const token = jwt.sign(
      {
        id: targetUser.id,
        email: targetUser.email,
        nome: targetUser.nome,
      },
      "BOSSGAMA"
    );

    return res.json(token);
    } catch (error) {
      return res.status(500).json("ERRO");
    }
    
  },

  async gerarTokenDeSenha(req: Request, res: Response) {
    logger.info(
      `[gerarTokenDeSenha] start function body=${JSON.stringify(
        req.body
      )} client_ip=${req.ips}`
    );
    const { email } = req.body;

    const savedUser = await Proprietario.findOne({
      select: {
        email,
      },
    });

    if (!savedUser) {
      logger.error(`[gerarTokenDeSenha] user not found`);
      return res.status(404).json("Email não encontrado");
    }
    logger.log("nivel", "mensagem");
    logger.info(`[gerarTokenDeSenha] user = ${JSON.stringify(savedUser)}`);

    const token = CryptoJS.AES.encrypt(
      `${savedUser.email}`,
      "GAMACRUD"
    ).toString();
    // enviar um email com o token
    savedUser.hashResetSenha = token;

    await savedUser.save();
    logger.info(`[gerarTokenDeSenha] finish function`);
    return res.json(token);
  },

  async recuperarSenha(req: Request, res: Response) {
    logger.info(
      `[recuperarSenha] start function body = ${JSON.stringify(req.body)}`
    );
    const { token, senha } = req.body;

    const bytes = CryptoJS.AES.decrypt(token, "GAMACRUD");
    const email = bytes.toString(CryptoJS.enc.Utf8);

    if (!email) {
      logger.error(`[recuperarSenha] token invalido, pois não existe o email`);
      return res.status(400).json("token invalido");
    }

    const savedUser = await Proprietario.findOne({
      select: {
        email,
      },
    });

    if (!savedUser) {
      logger.error(`[recuperarSenha] Email não encontrado email= ${email}`);
      return res.status(404).json("Email não encontrado");
    }

    if (!savedUser.hashResetSenha || savedUser.hashResetSenha !== token) {
      logger.error(
        `[recuperarSenha] Token diferente ou não existe no banco de dados`
      );
      return res.status(400).json("token invalido");
    }

    if (bcrypt.compareSync(senha, savedUser.senha)) {
      return res.status(400).json("Senha ja utilizada");
    }

    const novaSenha = criptografia.hashSync(savedUser.senha);

    savedUser.senha = novaSenha;

    savedUser.hashResetSenha = null;

    await savedUser.save();
    logger.info(`[recuperarSenha] finalizando a função com a senha alterada`);

    return res.sendStatus(201);
  },
};

export default controller;
