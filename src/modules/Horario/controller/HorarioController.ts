import { Request, Response } from "express";
import BadRequest from "../../../infra/erros/BadRequest";
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
          sabado,
        } = req.body;

        const horario = await this.useCase.criar(id, {
          ...req.body,
        });
        return res.status(201).json(horario);
      } catch (error) {
        return res.status(500).json("ERRO");
      }
    };
  }

  find() {
    return async (req: Request, res: Response) => {
      try {
        const horarios = await this.useCase.listar();
        return res.status(200).json(horarios);
      } catch (error) {
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  findOne() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const horariosId = await this.useCase.listarId(id);
        return res.status(200).json(horariosId);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const horarios = await this.useCase.atualizar(id, { ...req.body });
        return res.status(200).json(horarios);
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }

  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        await this.useCase.deletar(id);
        return res.status(204).json("Horario deletado");
      } catch (error) {
        if (error instanceof BadRequest) {
          return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json("Ocorreu algum erro, contate o suporte!");
      }
    };
  }
}
