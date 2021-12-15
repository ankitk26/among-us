import { getUser } from "@/lib/user";
import { MeQuery } from "@/src/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
  user: MeQuery["me"];
};

interface ICreateContextProps {
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function createContext({
  req,
  res,
}: ICreateContextProps): Promise<Context> {
  const user = await getUser(req);
  return { req, res, user };
}
