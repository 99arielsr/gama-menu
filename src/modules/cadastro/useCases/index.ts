import { proprietarioRepository }  from "../../../repositories";
import CadastroUseCase from "./CadastroProprietarioUseCase";

const cadastroUseCase= new CadastroUseCase(proprietarioRepository);

export { cadastroUseCase };