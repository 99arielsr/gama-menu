import { subcategoriaRepository }  from "../../../repositories";
import CadastroUseCase from "./SubcategoriaUseCase";

const cadastroUseCaseSubcategoria= new CadastroUseCase(subcategoriaRepository);

export { cadastroUseCaseSubcategoria };