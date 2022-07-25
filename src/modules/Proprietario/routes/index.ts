import { Router } from "express";
import { proprietarioController } from "../controller";

const routes = Router();

routes.post("/proprietario", proprietarioController.create());
routes.get("/proprietario", proprietarioController.find());

export default routes;
