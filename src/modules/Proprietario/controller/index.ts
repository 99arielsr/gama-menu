import { proprietarioUseCase } from "../useCases";
import ProprietarioController from "./ProprietarioController";

const proprietarioController = new ProprietarioController(proprietarioUseCase);

export { proprietarioController }