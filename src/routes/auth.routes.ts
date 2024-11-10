import authController from "@/controller/auth.controller.js";
import express from "express";

// Init Auth Router from express router
const authRouter = express.Router();

// Sign Up route handler
authRouter.post("/signup", authController.signup);

// Logger Account route handler
authRouter.get("/", authController.signin);

// Sign In route handler
authRouter.post("/signin", authController.signin);

// Delete Account handler
authRouter.delete("/", authController.delete);

export default authRouter;
