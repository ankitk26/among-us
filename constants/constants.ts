export const default_avatar = "/default_avatar.png";
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://among-us-kappa.vercel.app";
