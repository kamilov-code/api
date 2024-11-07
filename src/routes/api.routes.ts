import { Router } from "express";
import healthRouter from "./health.routes.js";

const apiRoutes = Router();

apiRoutes.use(healthRouter);

export default apiRoutes;
