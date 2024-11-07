import express from "express";

// Init Auth Router from express router
const authRouter = express.Router();

// Sign Up route handler
authRouter.post("/signup", (req, res) => {});

// Logger Account route handler
authRouter.get("/", (req, res) => {});

// Sign In route handler
authRouter.post("/signin", (req, res) => {});

// Delete Account handler
authRouter.delete("/", (req, res) => {});

export default authRouter;
