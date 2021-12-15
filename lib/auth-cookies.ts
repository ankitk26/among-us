import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_NAME = "token";
export const MAX_AGE = 60 * 60 * 8; // 8 hrs

export const setTokenCookie = (res: NextApiResponse, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });
  console.log(cookie);
  res.setHeader("Set-Cookie", cookie);
};

export const removeTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-cookie", cookie);
};

export const parseCookies = (req: NextApiRequest) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

export const getTokenCookie = (req: NextApiRequest) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};
