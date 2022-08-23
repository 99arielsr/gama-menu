import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/testes", controller.create());
routes.get("/testes", controller.find());
routes.get("/testes/:id", controller.findOne());
routes.put("/testes/:id", controller.update());
routes.delete("/testes/:id", controller.delete());

export default routes;
