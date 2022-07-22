import { Router } from "express";
import { cadastroController } from "../controller";

const routes = Router();

routes.post("/cadastro", cadastroController.create());

export default routes;