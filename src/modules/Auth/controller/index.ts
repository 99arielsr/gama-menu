import { authUseCase } from "../useCases";
import AuthController from "./AuthController";

const controller = new AuthController(authUseCase);

export { controller }