/**
 * @file src\index.ts
 * @description Main entry point for the project. This
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 04/11/2024
 */

import app from "./main";
import https, { ServerOptions } from "https";
import fs from "fs";
import path from "path";

const options: ServerOptions = {
  key: fs.readFileSync(path.join(process.cwd(), "certs/localhost-key.pem")),
  cert: fs.readFileSync(path.join(process.cwd(), "certs/localhost.pem")),
};

const server = https.createServer(options, app);

server.listen(process.env.PORT || 8443, () => {
  console.log(`Server is running on port ${process.env.PORT || 8443}`);
});
