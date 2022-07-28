import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/estabelecimento/:id", controller.create());
routes.get("/estabelecimento", controller.find());
routes.get("/estabelecimento/:id", controller.findOne());
routes.put("/estabelecimento/:id", controller.update());
routes.delete("/estabelecimento/:id", controller.delete());

export default routes;