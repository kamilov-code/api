type RegisterPayload = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};

type RegisterResult = {
  token: string;
  user: Omit<RegisterPayload, "id">;
};

type AuthService = {
  register: (payload: RegisterPayload) => Promise<RegisterResult>;
};

const authService: AuthService = {
  register(payload) {
    // Logic
    return new Promise(() => {});
  },
};

export default authService;
