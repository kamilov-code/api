import bcrypt from "bcryptjs";

async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(hashedPassword, password);
}

export default comparePassword;
