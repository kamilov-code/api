import express from "express";
import cors from "cors";
import helmet from "helmet";
import config from "./config/config";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(
      `Server running on port ${config.port} in ${config.nodeEnv} mode`
    );
  });
}

export default app;
