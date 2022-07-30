import { Router } from "express";
import { controllerCategoria } from "../controller";

const routes = Router();

routes.post("/categoria/:id",  controllerCategoria.create());
routes.get("/categoria/:id",  controllerCategoria.find());
routes.get("/categoria/:id",  controllerCategoria.findOne());
routes.put("/categoria/:id",  controllerCategoria.update());
routes.delete("/categoria/:id",  controllerCategoria.delete());

export default routes;