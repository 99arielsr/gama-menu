import { Router } from "express";
import { controllerEndereco } from "../controller";

const routes = Router();

routes.post("/endereco/:id",  controllerEndereco.create());
routes.get("/endereco/:id",  controllerEndereco.find());
routes.get("/endereco/:id",  controllerEndereco.findOne());
routes.put("/endereco/:id",  controllerEndereco.update());
routes.delete("/endereco/:id",  controllerEndereco.delete());

export default routes;