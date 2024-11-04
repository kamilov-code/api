import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};
