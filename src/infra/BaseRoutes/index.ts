import { Router } from "express";
import routesProprietario from "../../modules/Proprietario/routes";
import routesEstabelecimento from "../../modules/Estabelecimento/routes";
import routesEndereco from "../../modules/Endereco/routes"
import routesHorario from "../../modules/Horario/routes"

const routes = Router();

routes.use(routesProprietario);
routes.use(routesEstabelecimento);
routes.use(routesEndereco);
routes.use(routesHorario);

export default routes;
