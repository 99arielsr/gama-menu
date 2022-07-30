import { Router } from "express";
import { controllerCardapio } from "../controller";

const routes = Router();

routes.post("/cardapio/:id",  controllerCardapio.create());
routes.get("/cardapio/:id",  controllerCardapio.find());
routes.get("/cardapio/:id",  controllerCardapio.findOne());
routes.put("/cardapio/:id",  controllerCardapio.update());
routes.delete("/cardapio/:id",  controllerCardapio.delete());

export default routes;