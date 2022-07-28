import { enderecoRepository }  from "../../../repositories";
import CadastroUseCase from "./EnderecoUseCase";

const cadastroUseCaseEndereco= new CadastroUseCase(enderecoRepository);

export { cadastroUseCaseEndereco };