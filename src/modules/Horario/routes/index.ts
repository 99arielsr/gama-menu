import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/horarios/:id", controller.create());
routes.get("/horarios", controller.find());
routes.get("/horarios/:id", controller.findOne());
routes.put("/horarios/:id", controller.update());
routes.delete("/horarios/:id", controller.delete());

export default routes;