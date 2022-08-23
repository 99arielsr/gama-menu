import { testeRepository } from "../../../repositories";
import TesteUseCase from "./TesteUseCase";

const testeUseCase = new TesteUseCase(testeRepository);

export { testeUseCase };
