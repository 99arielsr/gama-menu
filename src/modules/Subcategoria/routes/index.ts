import { Router } from "express";
import { controllerSubcategoria } from "../controller";

const routes = Router();

routes.post("/subcategoria/:id",  controllerSubcategoria.create());
routes.get("/subcategoria/:id",  controllerSubcategoria.find());
routes.get("/subcategoria/:id",  controllerSubcategoria.findOne());
routes.put("/subcategoria/:id",  controllerSubcategoria.update());
routes.delete("/subcategoria/:id",  controllerSubcategoria.delete());

export default routes;