import { Router } from "express";
import routesCadastro from "../../modules/Cadastro/routes"

const routes = Router();

routes.use(routesCadastro);

export default routes;
