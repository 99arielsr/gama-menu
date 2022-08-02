import { cardapioRepository }  from "../../../repositories";
import CardapioUseCase from "./CardapioUseCase";

const cardapioUseCase= new CardapioUseCase(cardapioRepository);

export { cardapioUseCase };