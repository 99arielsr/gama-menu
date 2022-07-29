import { Router } from "express";
import { controller } from "../controller";
import upload from "../../../infra/middlewares/upload";

const routes = Router();

routes.post("/image/:id", upload.single("file"), controller.create());
// routes.get("/image/:id",  controller.find());
// routes.get("/image/:id",  controller.findOne());
// routes.put("/image/:id",  controller.update());
// routes.delete("/image/:id",  controller.delete());

export default routes;