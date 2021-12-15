import { NextApiRequest } from "next";
import User from "@/models/User";
import { getLoginSession } from "./auth";

export const getUser = async (req: NextApiRequest) => {
  const session = (await getLoginSession(req)) as any;
  if (session) {
    return User.findById(session.id);
  }
  return null;
};
