import { produtoRepository }  from "../../../repositories";
import CadastroUseCase from "./ProdutoUseCase";

const cadastroUseCaseProduto= new CadastroUseCase(produtoRepository);

export { cadastroUseCaseProduto };