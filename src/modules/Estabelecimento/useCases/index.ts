import { estabelecimentoRepository }  from "../../../repositories";
import CadastroUseCase from "./CadastroEstabelecimentoUseCase";

const cadastroUseCaseEstabelecimento= new CadastroUseCase(estabelecimentoRepository);

export { cadastroUseCaseEstabelecimento };