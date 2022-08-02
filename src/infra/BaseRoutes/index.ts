import { Router } from "express";
import routesProprietario from "../../modules/Proprietario/routes";
import routesEstabelecimento from "../../modules/Estabelecimento/routes";
import routesEndereco from "../../modules/Endereco/routes";
import routesHorario from "../../modules/Horario/routes";
import routesImage from "../../modules/Image/routes";
import routesLogin from "../../modules/Auth/routes";
import routesCardapio from "../../modules/Cardapio/routes";
import routesCategoria from "../../modules/Categoria/routes";
import routesSubcategoria from "../../modules/Subcategoria/routes";
import routesProduto from "../../modules/Produto/routes";
import routesAuth from "../../modules/Auth/routes";

const routes = Router();

routes.use(routesProprietario);
routes.use(routesEstabelecimento);
routes.use(routesEndereco);
routes.use(routesHorario);
routes.use(routesLogin);
routes.use(routesImage);
routes.use(routesCardapio);
routes.use(routesCategoria);
routes.use(routesSubcategoria);
routes.use(routesProduto);
routes.use(routesAuth);

export default routes;
