import { enderecoRepository }  from "../../../repositories";
import CadastroUseCase from "./CadastroEstabelecimentoUseCase";

const cadastroUseCaseEndereco= new CadastroUseCase(enderecoRepository);

export { cadastroUseCaseEndereco };