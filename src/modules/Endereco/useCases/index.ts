import { enderecoRepository }  from "../../../repositories";
import CadastroUseCase from "./EstabelecimentoUseCase";

const cadastroUseCaseEndereco= new CadastroUseCase(enderecoRepository);

export { cadastroUseCaseEndereco };