import { cadastroUseCaseEstabelecimento } from "../useCases";
import CadastroController from "./CadastroController";

const cadastroControllerEstabelecimento = new CadastroController(cadastroUseCaseEstabelecimento);

export { cadastroControllerEstabelecimento }