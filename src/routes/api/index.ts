import { Router } from "express";

const apiRoutes = Router();

apiRoutes.get("/", (req, res) => {
  res.status(200).json({ message: "Cannot GET /" });
});

export default apiRoutes;
