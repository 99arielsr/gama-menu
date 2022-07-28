import { horarioUseCase } from "../useCases";
import HorarioController from "./HorarioController";

const controller = new HorarioController(horarioUseCase);

export { controller }