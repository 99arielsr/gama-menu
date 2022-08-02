import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/cardapios/:id",  controller.create());
routes.get("/cardapios",  controller.find());
routes.get("/cardapios/:id",  controller.findOne());
routes.put("/cardapios/:id",  controller.update());
routes.delete("/cardapios/:id",  controller.delete());

export default routes;