import { Authentication } from "@/model/User.model.ts";
import * as express from "express";

declare global {
  namespace Express {
    interface Response {
      auth: (payload: Authentication) => void;
    }
  }
}
