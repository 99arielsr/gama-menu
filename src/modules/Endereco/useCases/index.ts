import { enderecoRepository }  from "../../../repositories";
import EnderecoUseCase from "./EnderecoUseCase";

const enderecoUseCase = new EnderecoUseCase(enderecoRepository);

export { enderecoUseCase };