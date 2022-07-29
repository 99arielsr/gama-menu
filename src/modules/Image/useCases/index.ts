import { imageRepository }  from "../../../repositories";
import ImageUseCase from "./ImageUseCase";

const imageUseCase= new ImageUseCase(imageRepository);

export { imageUseCase };