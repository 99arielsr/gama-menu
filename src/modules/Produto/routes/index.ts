import { Router } from "express";
import { controllerProduto } from "../controller";

const routes = Router();

routes.post("/produto/:id",  controllerProduto.create());
routes.get("/produto/:id",  controllerProduto.find());
routes.get("/produto/:id",  controllerProduto.findOne());
routes.put("/produto/:id",  controllerProduto.update());
routes.delete("/produto/:id",  controllerProduto.delete());

export default routes;