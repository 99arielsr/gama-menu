import { estabelecimentoUseCase } from "../useCases";
import EstabelecimentoController from "./EstabelecimentoController";

const controller = new EstabelecimentoController(estabelecimentoUseCase);

export { controller };