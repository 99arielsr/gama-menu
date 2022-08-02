import { produtoRepository }  from "../../../repositories";
import ProdutoUseCase from "./ProdutoUseCase";

const produtoUseCase= new ProdutoUseCase(produtoRepository);

export { produtoUseCase };