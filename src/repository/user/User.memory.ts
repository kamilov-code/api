import User, {
  UserID,
  UserUpdateFields,
  UserWithoutID,
} from "@/model/User.model.js";

type UserOrNull = User | null;

export interface UserMemoryRepository {
  readonly create: (data: UserWithoutID) => Promise<UserOrNull>;
  readonly read: typeof read;
  readonly update: (id: UserID, data: UserUpdateFields) => Promise<UserOrNull>;
  readonly delete: (id: UserID) => Promise<void>;
}

let users: User[] = [];

async function read(query: { username: string }): Promise<UserOrNull>;
async function read(query: { id: string }): Promise<UserOrNull>;

async function read(query: {
  username?: string;
  id?: string;
}): Promise<UserOrNull> {
  return new Promise((resolve, reject) => {
    let index: number;

    if (query.username) {
      index = users.findIndex((user) => user.username === query.username);
    } else if (query.id) {
      index = users.findIndex((user) => user.id === query.id);
    } else {
      return reject("Invalid query");
    }

    if (index === -1) return resolve(null);

    return resolve(users[index]);
  });
}

const userMemoryRepository: UserMemoryRepository = {
  create: async (data: UserWithoutID) => {
    return new Promise((resolve, reject) => {
      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        ...data,
      };

      users.push(user);
      resolve(user);
    });
  },
  read,
  update: async (id: UserID, data: UserUpdateFields) => {
    return new Promise(async (resolve, reject) => {
      const user = await userMemoryRepository.read({ id });

      if (!user) return reject("User not found");

      for (let field of Object.keys(user)) {
        if (field === "id") return;

        if (field in data && field in user) {
          if (data[field as keyof UserWithoutID] !== undefined) {
            user[field as keyof UserWithoutID] =
              data[field as keyof UserWithoutID]!;
          }
        }
      }

      resolve(user);
    });
  },
  delete: async (id: UserID) => {
    return new Promise(async (resolve, reject) => {
      users = users.filter((user) => user.id !== id);

      resolve();
    });
  },
};
export default userMemoryRepository;
