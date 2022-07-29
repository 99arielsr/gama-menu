import { Router } from "express";
import routesProprietario from "../../modules/Proprietario/routes";
import routesEstabelecimento from "../../modules/Estabelecimento/routes";
import routesEndereco from "../../modules/Endereco/routes";
import routesHorario from "../../modules/Horario/routes";
import routesImage from "../../modules/Image/routes";
import routesLogin from "../../modules/Auth/routes";

const routes = Router();

routes.use(routesProprietario);
routes.use(routesEstabelecimento);
routes.use(routesEndereco);
routes.use(routesHorario);
routes.use(routesLogin);
routes.use(routesImage);

export default routes;
