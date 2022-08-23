import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/teste", controller.create());
routes.get("/teste", controller.find());
routes.get("/teste/:id", controller.findOne());
routes.put("/teste/:id", controller.update());
routes.delete("/teste/:id", controller.delete());

export default routes;
