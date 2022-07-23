import { cadastroUseCaseHorario } from "../useCases";
import CadastroController from "./HorarioController";

const cadastroControllerHorario = new CadastroController(cadastroUseCaseHorario);

export { cadastroControllerHorario }