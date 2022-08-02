import { enderecoUseCase } from "../useCases";
import EnderecoController from "./EnderecoController";

const controller = new EnderecoController(enderecoUseCase);

export { controller }