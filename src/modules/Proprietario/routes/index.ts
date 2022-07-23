import { Router } from "express";
import { proprietarioController } from "../controller";

const routes = Router();

routes.post("/proprietario", proprietarioController.create());

export default routes;