import { cadastroUseCaseCategoria } from "../useCases";
import CadastroController from "./CategoriaController";

const controllerCategoria = new CadastroController(cadastroUseCaseCategoria);

export { controllerCategoria }