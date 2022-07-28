import { cadastroUseCaseEndereco } from "../useCases";
import CadastroController from "./EnderecoController";

const controllerEndereco = new CadastroController(cadastroUseCaseEndereco);

export { controllerEndereco }