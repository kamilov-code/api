import User, {
  Authentication,
  UserWithoutPassword,
} from "@/model/User.model.js";
import userMemoryRepository from "@/repository/user/User.memory.js";
import jwtService from "../jwt/jwt.service.js";
import passwordService from "../password/password.service.js";

type SigninOptions =
  | string
  | { username: string; password: string }
  | { bearer: string }
  | { basic: string };

async function signin(options: string): Promise<Authentication>;

async function signin(options: {
  username: string;
  password: string;
}): Promise<Authentication>;

async function signin(options: { bearer: string }): Promise<Authentication>;

async function signin(options: { basic: string }): Promise<Authentication>;

async function signin(options: SigninOptions): Promise<Authentication> {
  let username: string, password: string;

  if (typeof options === "string" && options.startsWith("Basic ")) {
    // Basic
    const credentials = Buffer.from(options.split("Basic ")[1], "base64")
      .toString("utf8")
      .split(":");

    username = credentials[0];
    password = credentials[1];
  }

  if (
    typeof options === "object" &&
    "username" in options &&
    "password" in options
  ) {
    username = options.username;
    password = options.password;
  }

  return new Promise(async (resolve, reject) => {
    return await userMemoryRepository
      .read({ username })
      .then(async (user) => {
        if (!user) return reject("User not found");

        const { firstname, lastname, id, username } = user;

        const verify = await passwordService.compare(user.password, password);

        if (!verify) return reject("Invalid password");

        const refreshId = Math.random().toString(36).substring(2, 9);

        const refresh = await jwtService.sign(user.id, {
          id: refreshId,
          username,
          firstname,
          lastname,
        });

        const token = await jwtService.sign(refreshId, {
          id,
          username,
          firstname,
          lastname,
        });

        return resolve({
          user: {
            id,
            username,
            firstname,
            lastname,
          },
          token,
          refresh,
        });
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

export default signin;
