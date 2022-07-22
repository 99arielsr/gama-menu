import { Router } from "express";
import { cadastroControllerHorario } from "../controller";

const routes = Router();

routes.post("/cadastrohorario/:id", cadastroControllerHorario.create());

export default routes;