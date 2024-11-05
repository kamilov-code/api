import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

export default {
  port: parseInt(process.env.PORT || "3000", 10),
  httpsPort: parseInt(process.env.HTTPS_PORT || "3443", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  useHttps: process.env.USE_HTTPS === "true",
  certificates: {
    cert: process.env.CERT_PATH || "",
    key: process.env.KEY_PATH || "",
  },
};
