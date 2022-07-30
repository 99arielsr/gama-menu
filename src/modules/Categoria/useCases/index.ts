import { categoriaRepository }  from "../../../repositories";
import CadastroUseCase from "./CategoriaUseCase";

const cadastroUseCaseCategoria= new CadastroUseCase(categoriaRepository);

export { cadastroUseCaseCategoria };