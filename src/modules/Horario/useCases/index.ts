import { horarioRepository }  from "../../../repositories";
import HorarioUseCase from "./HorarioUseCase";

const horarioUseCase= new HorarioUseCase(horarioRepository);

export { horarioUseCase };