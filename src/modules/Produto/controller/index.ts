import { cadastroUseCaseProduto } from "../useCases";
import CadastroController from "./ProdutoController";

const controllerProduto = new CadastroController(cadastroUseCaseProduto);

export { controllerProduto }