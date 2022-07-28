import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/proprietario", controller.create());
routes.get("/proprietario", controller.find());
routes.get("/proprietario/:id", controller.findOne());
routes.put("/proprietario/:id", controller.update());
routes.delete("/proprietario/:id", controller.delete());

export default routes;
