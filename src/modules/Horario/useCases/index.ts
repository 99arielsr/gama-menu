import { horarioRepository }  from "../../../repositories";
import CadastroUseCase from "./CadastroEstabelecimentoUseCase";

const cadastroUseCaseHorario= new CadastroUseCase(horarioRepository);

export { cadastroUseCaseHorario };