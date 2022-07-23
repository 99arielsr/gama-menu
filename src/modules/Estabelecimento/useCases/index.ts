import { estabelecimentoRepository }  from "../../../repositories";
import CadastroUseCase from "./EstabelecimentoUseCase";

const cadastroUseCaseEstabelecimento= new CadastroUseCase(estabelecimentoRepository);

export { cadastroUseCaseEstabelecimento };