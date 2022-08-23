import { testeUseCase } from "../useCases";
import TesteController from "./TesteController";

const controller = new TesteController(testeUseCase);

export { controller };
