import { cadastroUseCaseEstabelecimento } from "../useCases";
import CadastroController from "./EstabelecimentoController";

const cadastroControllerEstabelecimento = new CadastroController(cadastroUseCaseEstabelecimento);

export { cadastroControllerEstabelecimento }