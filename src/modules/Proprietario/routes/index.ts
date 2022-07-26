import { Router } from "express";
import { proprietarioController } from "../controller";

const routes = Router();

routes.post("/proprietario", proprietarioController.create());
routes.get("/proprietario", proprietarioController.find());
routes.get("/proprietario/:id", proprietarioController.findOne());

export default routes;
