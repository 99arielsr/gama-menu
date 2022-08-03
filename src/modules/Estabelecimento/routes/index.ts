import { Router } from "express";
import { controller } from "../controller";
import auth from "../../../infra/middlewares/auth";

const routes = Router();

routes.post("/estabelecimentos/:id", auth, controller.create());
routes.get("/estabelecimentos", controller.find());
routes.get("/estabelecimentos/:id", controller.findOne());
routes.put("/estabelecimentos/:id", controller.update());
routes.delete("/estabelecimentos/:id", controller.delete());

export default routes;