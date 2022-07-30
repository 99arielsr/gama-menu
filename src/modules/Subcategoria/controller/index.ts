import { cadastroUseCaseSubcategoria } from "../useCases";
import CadastroController from "./SubcategoriaController";

const controllerSubcategoria = new CadastroController(cadastroUseCaseSubcategoria);

export { controllerSubcategoria }