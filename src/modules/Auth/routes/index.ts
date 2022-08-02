import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/login", controller.login());
// routes.post("/reset-senha", AuthController.gerarTokenDeSenha);
// routes.post("/recuperar-senha", AuthController.recuperarSenha);

export default routes;