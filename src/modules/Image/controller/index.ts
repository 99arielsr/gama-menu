import { imageUseCase } from "../useCases";
import ImageController from "./ImageController";

const controller = new ImageController(imageUseCase);

export { controller }