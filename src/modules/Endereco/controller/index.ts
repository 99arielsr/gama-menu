import { cadastroUseCaseEndereco } from "../useCases";
import CadastroController from "./CadastroController";

const cadastroControllerEndereco = new CadastroController(cadastroUseCaseEndereco);

export { cadastroControllerEndereco }