import { Request, Response } from "express";
import Images from "../../../models/Images";
import Estabelecimento from "../../../models/Estabelecimento";

const controller = {
  async create(req: Request, res: Response) {
    const {name, logo, endereco, ativo, horario_funcionameno, delivery, retirada} = req.body;
    
  }
}