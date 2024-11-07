import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (_, res) => {
  res.status(200).json({ status: "healthy" });
});

export default healthRouter;
