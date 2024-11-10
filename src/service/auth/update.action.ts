import User, { Authentication, UserWithoutID } from "@/model/User.model.js";
import authService from "./auth.service.js";

async function update(
  auth: Authentication,
  data: UserWithoutID
): Promise<User> {
  return new Promise(async (resolve, reject) => {
    const user = await authService.signin({
      bearer: auth.token,
    });
  });
}

export default update;
