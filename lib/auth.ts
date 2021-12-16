import { TOKEN_SECRET } from "@/constants/constants";
import { MeQuery } from "@/src/generated/graphql";
import { AuthenticationError } from "apollo-server-errors";
import { sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { getTokenCookie, setTokenCookie } from "./auth-cookies";

export const setLoginSession = async (
  res: NextApiResponse,
  session: MeQuery["me"]
) => {
  console.log(TOKEN_SECRET);
  const token = sign(session, TOKEN_SECRET, {
    expiresIn: "8h",
  });
  setTokenCookie(res, token);
};

export const getLoginSession = async (req: NextApiRequest) => {
  try {
    const token = getTokenCookie(req);
    if (!token) return null;
    const session = verify(token, TOKEN_SECRET);
    return session;
  } catch (err) {
    throw new AuthenticationError("Session expired");
  }
};
