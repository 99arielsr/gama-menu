import { Router } from "express";
import routesCadastroProprietario from "../../modules/Proprietario/routes";
import routesCadastroEstabelecimento from "../../modules/Estabelecimento/routes";
import routesCadastroEndereco from "../../modules/Endereco/routes"
import routesCadastroHorario from "../../modules/Horario/routes"

const routes = Router();

routes.use(routesCadastroProprietario);
routes.use(routesCadastroEstabelecimento);
routes.use(routesCadastroEndereco);
routes.use(routesCadastroHorario);

export default routes;
