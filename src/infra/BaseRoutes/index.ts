import { Router } from "express";
import routesCadastro from "../../modules/Cadastro/routes"

const routes = Router();

routes.use("/cadastro", routesCadastro);

export default routes;
