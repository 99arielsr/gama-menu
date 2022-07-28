import { Router } from "express";
import { cadastroControllerHorario } from "../controller";

const routes = Router();

routes.post("/horario/:id", cadastroControllerHorario.create());

export default routes;