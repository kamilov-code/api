interface User {
  readonly id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export type UserWithoutID = Omit<User, "id">;
export type UserUpdateFields = Partial<Omit<User, "id">>;
export type UserID = User["id"];
export type UserWithoutPassword = Omit<User, "password">;

export type Authentication = {
  user: UserWithoutPassword;
  token: string;
  refresh: string;
};

export default User;
