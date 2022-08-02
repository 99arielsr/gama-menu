import { cardapioUseCase } from "../useCases";
import CardapioController from "./CardapioController";

const controller = new CardapioController(cardapioUseCase);

export { controller }