import { Router } from "express";
import { estabelecimentoController } from "../controller";

const routes = Router();

routes.post("/estabelecimento/:id", estabelecimentoController.create());
routes.get("/estabelecimento", estabelecimentoController.find());

export default routes;