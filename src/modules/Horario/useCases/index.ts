import { horarioRepository }  from "../../../repositories";
import CadastroUseCase from "./HorarioUseCase";

const cadastroUseCaseHorario= new CadastroUseCase(horarioRepository);

export { cadastroUseCaseHorario };