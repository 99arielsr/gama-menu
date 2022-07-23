import { proprietarioRepository } from "../../../repositories";
import ProprietarioUseCase from "./ProprietarioUseCase";

const proprietarioUseCase = new ProprietarioUseCase(proprietarioRepository);

export { proprietarioUseCase };
