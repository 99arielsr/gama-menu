import { Router } from "express";
import controller from "../controllers/Users";
import upload from "../../../infra/middlewares/upload";
const routes = Router();

routes.post("/user", upload.single("avatar"), controller.create);
routes.get("/user", controller.list);

export default routes;
