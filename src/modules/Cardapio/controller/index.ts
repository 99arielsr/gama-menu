import { cadastroUseCaseCardapio } from "../useCases";
import CadastroController from "./CardapioController";

const controllerCardapio = new CadastroController(cadastroUseCaseCardapio);

export { controllerCardapio }