import { Request, Response } from "express";
import Estabelecimento from "../../../models/Estabelecimento";
import CadastroUseCase from "../useCases/CadastroEstabelecimentoUseCase";

export default class CadastroController {
  private useCase: CadastroUseCase;

  constructor(useCase: CadastroUseCase) {
    this.useCase = useCase;
  }

  create(){
    return async (req: Request, res: Response) =>{
      try {
        const { id } = req.params;
        const { cep, logradouro, numero, complemento, referencia, bairro, cidade, estado, } = req.body;
        const endereco = await this.useCase.cadastroEndereco({
          cep,
          logradouro,
          numero,
          complemento,
          referencia,
          bairro,
          cidade,
          estado,
        })

        await  Estabelecimento.findByIdAndUpdate( id, {
          endereco: [endereco._id]
        })

        return res.status(201).json(endereco);
      } catch (error) {
        return res.status(500).json("ERRO AO CADASTRAR ENDEREÇO");
      }
    }
  }
}