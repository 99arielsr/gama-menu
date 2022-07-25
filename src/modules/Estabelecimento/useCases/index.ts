import { estabelecimentoRepository } from "../../../repositories";
import EstabelecimentoUseCase from "./EstabelecimentoUseCase";

const estabelecimentoUseCase = new EstabelecimentoUseCase(estabelecimentoRepository);

export { estabelecimentoUseCase };
