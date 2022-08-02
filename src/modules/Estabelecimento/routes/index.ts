import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/estabelecimentos/:id", controller.create());
routes.get("/estabelecimentos", controller.find());
routes.get("/estabelecimentos/:id", controller.findOne());
routes.put("/estabelecimentos/:id", controller.update());
routes.delete("/estabelecimentos/:id", controller.delete());

export default routes;