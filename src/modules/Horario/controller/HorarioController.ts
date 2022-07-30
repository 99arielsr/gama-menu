import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Estabelecimento from "../../../models/Estabelecimento";
import { IHorario } from "../../../models/Horario";
import HorarioUseCase from "../useCases/HorarioUseCase";

export default class HorarioController {
  private useCase: HorarioUseCase;

  constructor(useCase: HorarioUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { 
          hora_abre, 
          hora_fecha, 
          domingo, 
          segunda, 
          terca, 
          quarta, 
          quinta, 
          sexta, 
          sabado 
        } = req.body;

        const estabelecimentoExistente = await Estabelecimento.count({
          _id: id,
        });
        if (estabelecimentoExistente == 0) {
          return res.status(400).json("Estabelecimento não encontrado");
        }

        const horario = await this.useCase.criar({
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
  find() {
    return async (req: Request, res: Response) => {
      try {
        const listarTodos = await this.useCase.listar();
        return res.status(200).json(listarTodos);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        if(!id) {
          return res.status(404).json("Envie um Id válido!");
        }

        const listarUm = await this.useCase.listarId(id);
        return res.status(200).json(listarUm);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    }
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        
        if(!id){
          return res.status(404).json("Envie um id válido!");
        }

        const { nome, email, senha } = req.body;
        const atualizado = await this.useCase.atualizar(id, {...req.body});
        return res.status(200).json(atualizado);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        if(!id){
          return res.status(404).json("Envie um id válido!");
        }

        await this.useCase.deletar(id);
        return res.status(204).json("Horario deletado");
      } catch (error) {
        console.log(error);
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}