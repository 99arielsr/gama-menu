import { Router } from "express";
import { cadastroControllerEstabelecimento } from "../controller";

const routes = Router();

routes.post("/cadastroestabelecimento/:id", cadastroControllerEstabelecimento.create() );

export default routes;