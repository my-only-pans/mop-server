import jwt from "jsonwebtoken";
import config from "../../config";

export default async function createJwt(userId: string): Promise<string> {
  const token = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: "24h" });

  return token;
}
