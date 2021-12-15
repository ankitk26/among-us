import { MeQuery } from "@/src/generated/graphql";
import Iron from "@hapi/iron";
import { AuthenticationError } from "apollo-server-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { getTokenCookie, MAX_AGE, setTokenCookie } from "./auth-cookies";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const setLoginSession = async (
  res: NextApiResponse,
  session: MeQuery["me"]
) => {
  const obj = { ...session, createdAt: Date.now(), maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
};

export const getLoginSession = async (req: NextApiRequest) => {
  const token = getTokenCookie(req);
  if (!token) return null;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new AuthenticationError("Session expired");
  }

  return session;
};
