import { Router } from "express";

import userRoutes from "../../modules/User/routes";

const routes = Router();

routes.use(userRoutes);

export default routes;
