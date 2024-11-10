import bcrypt from "bcryptjs";

async function encodePassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export default encodePassword;
