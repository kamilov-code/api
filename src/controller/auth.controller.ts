import { Authentication } from "@/model/User.model.js";
import authService from "@/service/auth/auth.service.js";
import { RequestHandler, Response } from "express";

const actions = ["update", "signin", "signup", "delete"] as const;

type Action = (typeof actions)[number];

type AuthController = {
  [A in Action]: RequestHandler;
};

const authController: AuthController = {
  signup: async (req, res) => {
    try {
      const payload = await authService.signup(req.body);

      res
        .status(200)
        .cookie("Authorization", payload.refresh, {
          expires: new Date(Date.now() + 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
        })
        .json({
          data: {
            user: payload.user,
            token: payload.token,
          },
        });
    } catch (error) {
      if (typeof error === "string") {
        res.status(400).json({ error });
        return;
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  signin: async (req, res) => {
    try {
      const { refresh, token, user } = await authService.signin(
        req.headers["authorization"]!
      );

      res
        .status(200)
        .cookie("Authorization", refresh, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        .json({
          data: {
            user,
            token,
          },
        });
    } catch (error) {
      if (typeof error === "string") {
        res.status(400).json({ error });
        return;
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    try {
      if (!req.auth) {
        res.status(401).json({ error: "You must login first" });
        return;
      }

      const data = await authService.update(req.auth, req.body);

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    try {
      const data = await authService.delete(req.headers["authorization"]!);

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
