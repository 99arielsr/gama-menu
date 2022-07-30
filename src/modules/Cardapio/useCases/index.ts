import { cardapioRepository }  from "../../../repositories";
import CadastroUseCase from "./CardapioUseCase";

const cadastroUseCaseCardapio= new CadastroUseCase(cardapioRepository);

export { cadastroUseCaseCardapio };