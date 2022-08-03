import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/enderecos/:id",  controller.create());
routes.get("/enderecos",  controller.find());
routes.get("/enderecos/:id",  controller.findOne());
routes.put("/enderecos/:id",  controller.update());
routes.delete("/enderecos/:id",  controller.delete());

export default routes;