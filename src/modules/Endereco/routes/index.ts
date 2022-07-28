import { Router } from "express";
import { cadastroControllerEndereco } from "../controller";

const routes = Router();

routes.post("/endereco/:id",  cadastroControllerEndereco.create());

export default routes;