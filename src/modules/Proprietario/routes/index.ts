import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/proprietarios", controller.create());
routes.get("/proprietarios", controller.find());
routes.get("/proprietarios/:id", controller.findOne());
routes.put("/proprietarios/:id", controller.update());
routes.delete("/proprietarios/:id", controller.delete());

export default routes;
