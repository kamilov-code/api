/**
 * @file src\index.ts
 * @description Main entry point for the api project
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 04/11/2024
 * @version 0.0.0
 */

import express from "express";
import apiRoutes from "./routes/api";

const app = express();

app.use("/api", apiRoutes);

export default app;
