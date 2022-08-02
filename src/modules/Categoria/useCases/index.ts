import { categoriaRepository }  from "../../../repositories";
import CategoriaUseCase from "./CategoriaUseCase";

const categoriaUseCase= new CategoriaUseCase(categoriaRepository);

export { categoriaUseCase };