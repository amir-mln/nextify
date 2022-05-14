import { validateUser } from "lib/auth/validator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const user = await validateUser(req);

  return user ? res.json({ ...user, password: -1 }) : res.status(401).json({ error: "Not Authorized" });
}
