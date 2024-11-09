import User, { Authentication } from "@/model/User.model.js";
import userMemoryRepository from "@/repository/user/User.memory.js";
import { randomUUID } from "crypto";
import authService from "./auth.service.js";
import passwordService from "../password/password.service.js";

type EmailSignup = {
  email: string;
};

type UsernameSignup = {
  username: string;
};

type PhoneSignup = {
  phone: string;
};

type SignupOptions = EmailSignup &
  UsernameSignup &
  PhoneSignup & {
    password: string;
    firstname: string;
    lastname: string;
  };

type SignupResult = Authentication;

async function signup({
  password,
  firstname,
  lastname,
  email,
}: SignupOptions): Promise<SignupResult>;

async function signup({
  password,
  firstname,
  lastname,
  username,
}: SignupOptions): Promise<SignupResult>;

async function signup({
  password,
  firstname,
  lastname,
  phone,
}: SignupOptions): Promise<SignupResult>;

async function signup(options: SignupOptions): Promise<SignupResult> {
  return new Promise(async (resolve, reject) => {
    const { password, firstname, lastname } = options;

    if (options.phone) {
      const exist = await userMemoryRepository.read({
        username: options.phone,
      });

      if (exist) return reject("Phone number already exists");

      const hashedPassword = await passwordService.encode(String(password));
      const user = await userMemoryRepository.create({
        username: options.phone,
        firstname,
        lastname,
        password: hashedPassword,
      });

      if (!user) return reject("Failed to create user");

      const authentication = await authService.signin({
        username: user.username,
        password: password,
      });

      resolve(authentication);
    }
  });
}

export default signup;
