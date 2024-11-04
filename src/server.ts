/**
 * @file src\index.ts
 * @description Main entry point for the project. This
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 04/11/2024
 */

import app from "./app";
import https, { ServerOptions } from "https";
import fs from "fs";
import path from "path";

const options: ServerOptions = {
  key: fs.readFileSync(path.join(process.cwd(), "certs/localhost-key.pem")),
  cert: fs.readFileSync(path.join(process.cwd(), "certs/localhost.pem")),
};

const server = https.createServer(options, app);

export default server;
