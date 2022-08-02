import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/produtos/:id",  controller.create());
routes.get("/produtos/:id",  controller.find());
routes.get("/produtos/:id",  controller.findOne());
routes.put("/produtos/:id",  controller.update());
routes.delete("/produtos/:id",  controller.delete());

export default routes;