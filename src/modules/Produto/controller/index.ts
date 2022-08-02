import { produtoUseCase } from "../useCases";
import ProdutoController from "./ProdutoController";

const controller = new ProdutoController(produtoUseCase);

export { controller }