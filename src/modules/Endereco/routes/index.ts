import { Router } from "express";
import { cadastroControllerEndereco } from "../controller";

const routes = Router();

routes.post("/cadastroendereco/:id",  cadastroControllerEndereco.create());

export default routes;