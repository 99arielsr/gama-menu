import { cadastroUseCaseHorario } from "../useCases";
import CadastroController from "./CadastroController";

const cadastroControllerHorario = new CadastroController(cadastroUseCaseHorario);

export { cadastroControllerHorario }