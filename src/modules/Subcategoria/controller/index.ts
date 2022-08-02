import { subcategoriasUseCase } from "../useCases";
import SubcategoriasController from "./SubcategoriaController";

const controllerSubcategorias = new SubcategoriasController(subcategoriasUseCase);

export { controllerSubcategorias }