import User, { UserWithoutID } from "@/model/User.model.js";

async function update(id: string, data: UserWithoutID): Promise<User> {
  return new Promise((resolve, reject) => {});
}

export default update;
