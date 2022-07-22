import { proprietarioRepository }  from "../../../repositories";
import CadastroUseCase from "./CadastroUseCase";

const cadastroUseCase= new CadastroUseCase(proprietarioRepository);

export { cadastroUseCase };