import { cadastroUseCaseEndereco } from "../useCases";
import CadastroController from "./EnderecoController";

const cadastroControllerEndereco = new CadastroController(cadastroUseCaseEndereco);

export { cadastroControllerEndereco }