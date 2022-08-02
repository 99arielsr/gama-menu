import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/categorias/:id",  controller.create());
routes.get("/categorias/:id",  controller.find());
routes.get("/categorias/:id",  controller.findOne());
routes.put("/categorias/:id",  controller.update());
routes.delete("/categorias/:id",  controller.delete());

export default routes;