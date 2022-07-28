import { proprietarioUseCase } from "../useCases";
import ProprietarioController from "./ProprietarioController";

const controller = new ProprietarioController(proprietarioUseCase);

export { controller };