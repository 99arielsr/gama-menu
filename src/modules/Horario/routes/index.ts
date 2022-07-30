import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/horario/:id", controller.create());
routes.get("/horario", controller.find());
routes.get("/horario/:id", controller.findOne());
routes.put("/horario/:id", controller.update());
routes.delete("/horario/:id", controller.delete());

export default routes;