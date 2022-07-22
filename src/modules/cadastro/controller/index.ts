import { cadastroUseCase } from "../useCases";
import CadastroController from "./CadastroController";


const cadastroController = new CadastroController(cadastroUseCase);

export { cadastroController }