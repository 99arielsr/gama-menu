import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Estabelecimento from "../../../models/Estabelecimento";
import { IHorario } from "../../../models/Horario";
import CadastroUseCase from "../useCases/HorarioUseCase";

export default class CadastroController {
  private useCase: CadastroUseCase;

  constructor(useCase: CadastroUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { hora_abre, hora_fecha, domingo, segunda, terca, quarta, quinta, sexta, sabado } = req.body;

        const horario = await this.useCase.cadastroHorario({
          hora_abre,
          hora_fecha,
          domingo,
          segunda,
          terca,
          quarta,
          quinta,
          sexta,
          sabado,
        })

        const estabelecimento = await Estabelecimento.findById(id);
        let horarioExistente: IHorario[] | ObjectId[] = []
        
        if  (estabelecimento){
          horarioExistente = estabelecimento.horario;
        }

        await  Estabelecimento.findByIdAndUpdate( id, {
          horario: [
            ...horarioExistente,
            horario.id
          ]
        })

        return res.status(201).json(horario);
      } catch (error) {
        return res.status(500).json("ERRO");
      }
    };
  }
}