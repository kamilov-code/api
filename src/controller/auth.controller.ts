import { RequestHandler } from "express";

const actions = ["me", "signin", "signup", "delete"] as const;

type Action = (typeof actions)[number];

type AuthController = {
  [A in Action]: RequestHandler;
};

const authController: AuthController = {
  signin: async (req, res) => {},
  signup: async (req, res) => {},
  me: async (req, res) => {},
  delete: (req, res) => {},
};

export default authController;
