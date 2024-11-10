import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import https from "https";
import fs from "fs";
import config from "./config/config.js";
import apiRouter from "./routes/api.routes.js";
import path from "path";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const publicPath = path.join(process.cwd(), "public");

app.use(express.static(publicPath));

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

// Privacy policy
app.get("/help/privacy", (_, res) => {
  res.status(200).json({ status: "healthy", message: "Privacy policy" });
});

// Delete account
app.get("/help/delete", (_, res) => {
  res.status(200).sendFile(path.join(publicPath, "delete-account.html"));
});

// API router
app.use("/api", apiRouter);

// Auth routes
app.use("/auth", authRouter);

// Redirect HTTP to HTTPS in production mode
if (config.nodeEnv === "production" && config.useHttps) {
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  // Create HTTP server
  const httpServer = http.createServer(app);
  httpServer.listen(config.port, () => {
    console.log(`HTTP Server running on port ${config.port}`);
  });

  // Create HTTPS server if enabled
  if (config.useHttps) {
    try {
      const httpsOptions = {
        key: fs.readFileSync(config.certificates.key),
        cert: fs.readFileSync(config.certificates.cert),
      };

      const httpsServer = https.createServer(httpsOptions, app);
      httpsServer.listen(config.httpsPort, () => {
        console.log(`HTTPS Server running on port ${config.httpsPort}`);
      });
    } catch (error) {
      console.error("Failed to start HTTPS server:", error);
    }
  }
}

export default app;
