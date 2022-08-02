import { categoriaUseCase } from "../useCases";
import CategoriaController from "./CategoriaController";

const controller = new CategoriaController(categoriaUseCase);

export { controller }