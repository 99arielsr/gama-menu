import { subcategoriaRepository }  from "../../../repositories";
import SubcategoriasUseCase from "./SubcategoriaUseCase";

const subcategoriasUseCase = new SubcategoriasUseCase(subcategoriaRepository);

export { subcategoriasUseCase };