import User, { UserID } from "@/model/User.model.js";
import jwt from "jsonwebtoken";

type SignPayload = {
  id: UserID;
  username: User["username"];
  firstname: User["firstname"];
  lastname: User["lastname"];
};

// async function signJwt(payload: SignPayload): Promise<string>;

async function signJwt(issuer: string, payload: SignPayload): Promise<string>;

async function signJwt(
  issuerOrPayload: SignPayload | string,
  payload: SignPayload
): Promise<string> {
  return new Promise((resolve, reject) => {
    const data =
      typeof issuerOrPayload === "string" ? payload : issuerOrPayload;
    const issuer =
      typeof issuerOrPayload === "string" ? issuerOrPayload : data.username;

    return jwt.sign(
      data,
      process.env.JWT_SECRET || "not secured",
      {
        expiresIn: "1h",
        jwtid: data.id,
        issuer,
      },
      (err, token) => {
        if (err || !token) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export default signJwt;
