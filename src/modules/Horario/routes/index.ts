import { Router } from "express";
import { controller } from "../controller";

const routes = Router();

routes.post("/horario/:id", controller.create());

export default routes;