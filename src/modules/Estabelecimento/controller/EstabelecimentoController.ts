import { Request, Response } from "express";
import Proprietario from "../../../models/Proprietario";
import EstabelecimentoUseCase from "../useCases/EstabelecimentoUseCase";

export default class EstabelecimentoController {
  private useCase: EstabelecimentoUseCase;

  constructor(useCase: EstabelecimentoUseCase) {
    this.useCase = useCase;
  }
  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, segmento, ativo, delivery, retirada, horario, endereco, logo} = req.body;  
        
        const proprietarioExistente = await Proprietario.count({
          id,
        });
    
        if (proprietarioExistente == 0) {
          return res.status(400).json("Proprietário não encontrado");
        }
        
        const estabelecimento = await this.useCase.cadastroEstabelecimento({
          nome,
          segmento,
          ativo,
          delivery,
          retirada,
          horario,
          endereco,
          logo
        })

        await Proprietario.findByIdAndUpdate( id, {
          estabelecimento: [estabelecimento._id]
        })

        return res.status(201).json(estabelecimento);
      } catch (error) {
        return res.status(500).json("ERRO");
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const listarTodos = await this.useCase.listarEstabelecimento();
        return res.status(200).json(listarTodos);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }
}