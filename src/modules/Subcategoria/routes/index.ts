import { Router } from "express";
import { controllerSubcategorias } from "../controller";

const routes = Router();

routes.post("/subcategorias/:id",  controllerSubcategorias.create());
routes.get("/subcategorias",  controllerSubcategorias.find());
routes.get("/subcategorias/:id",  controllerSubcategorias.findOne());
routes.put("/subcategorias/:id",  controllerSubcategorias.update());
routes.delete("/subcategorias/:id",  controllerSubcategorias.delete());

export default routes;