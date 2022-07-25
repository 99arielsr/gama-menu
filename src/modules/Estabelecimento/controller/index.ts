import { estabelecimentoUseCase } from "../useCases";
import EstabelecimentoController from "./EstabelecimentoController";

const estabelecimentoController = new EstabelecimentoController(estabelecimentoUseCase);

export { estabelecimentoController };